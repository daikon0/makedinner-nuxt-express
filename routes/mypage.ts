import express, { Request, Response, NextFunction } from 'express'
import csrf from 'csurf'
import multer from 'multer'
import s3Storage from 'multer-sharp-s3'
import aws from 'aws-sdk'

const router = express.Router()
const csrfProtection = csrf({ cookie: true })
aws.config.update({ region: 'ap-northeast-1' })
const s3 = new aws.S3()
const storage = s3Storage({
  s3,
  Bucket: 'sample.makediner',
  ACL: 'public-read',
  resize: {
    height: 350
  }
})
const upload = multer({ storage })

const db = require('../models/index')

// メニュー一覧表示
router.get('/menu', async (req: any, res: Response, next: NextFunction) => {
  const dish = await db.dish
    .findAll({
      where: { createdBy: req.user.name.id },
      order: [['"updatedAt"', 'DESC']]
    })
    .catch((err: Error) => {
      next(err)
    })
  res.send(dish)
})

// 料理の画面表示
router.get('/menu/:dishId', async (req: Request, res: Response, next: NextFunction) => {
  const dish = await db.dish
    .findOne({
      where: { dishId: req.params.dishId }
    })
    .catch((err: Error) => {
      next(err)
      return res.status(404)
    })
  res.send(dish)
})

// 料理の編集
router.post('/menu/:dishId/edit', csrfProtection, async (req: Request, res: Response, next: NextFunction) => {
  const dish = await db.dish
    .findOne({
      where: { dishId: req.params.dishId }
    })
    .catch((err: Error) => {
      next(err)
    })
  dish
    .update({
      dishName: req.body.dishName,
      dishUrl: req.body.dishUrl
    })
    .catch((err: Error) => {
      next(err)
    })
  res.redirect('/mypage/menu')
})

// 画像の編集処理
router.post(
  '/editFile',
  upload.single('dishFile'),
  csrfProtection,
  async (req: any, res: Response, next: NextFunction) => {
    const dish = await db.dish.findOne({
      where: { dishId: req.body.dishId }
    })
    dish
      .update({
        dishFile: req.file.Location || null
      })
      .catch((err: Error) => {
        next(err)
      })
    res.redirect('/mypage/menu')
  }
)

// 料理の削除
router.post('/menu/:dishId/delete', csrfProtection, async (req: Request, res: Response, next: NextFunction) => {
  await deleteDish(req.params.dishId).catch((err: Error) => {
    next(err)
  })
  res.redirect('/mypage/menu')
})

async function deleteDish(dishId: string) {
  const dish = await db.dish.findAll({
    where: { dishId }
  })
  const promises = dish.map((d: any) => {
    return d.destroy()
  })
  return Promise.all(promises)
}

router.get('/selectGenre', async (req: any, res: Response, next: NextFunction) => {
  const genre: string = req.query.genre
  const maindish = await selectDish(req, genre, 'main')
  const subdish = await selectDish(req, genre, 'sub')
  const soup = await selectDish(req, genre, 'soup')
  const dish = {
    main: maindish,
    sub: subdish,
    soup
  }
  res.send(dish)
})

// ジャンルが選択された際に料理を渡す
async function selectDish(req: any, genre: string, role: string) {
  const dishArray = await db.dish.findAll({
    where: {
      dishGenre: genre,
      createdBy: req.user.name.id,
      dishRole: role
    }
  })
  return rondomDish(dishArray)
}

function rondomDish(dishArray: object[]) {
  return dishArray[Math.floor(Math.random() * dishArray.length)]
}

module.exports = router
