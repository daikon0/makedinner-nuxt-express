import express, { Request, Response, NextFunction } from 'express'
import csrf from 'csurf'
import uuid from 'uuid'
import multer from 'multer'
import s3Storage from 'multer-sharp-s3'
import aws from 'aws-sdk'

const router = express.Router()
const csrfProtection = csrf({ cookie: true })
const updatedAt = new Date()
aws.config.update({ region: 'ap-northeast-1' })
const s3 = new aws.S3()

const db = require('../models/index')

const storage = s3Storage({
  s3,
  Bucket: 'sample.makediner',
  ACL: 'public-read',
  resize: {
    height: 350
  }
})
const upload = multer({ storage })

router.post(
  '/',
  upload.single('dishFile'),
  csrfProtection,
  async (req: any, res: Response, next: NextFunction) => {
    const fileCheck = req.file
    const dishId = uuid.v4()
    // fileをnullにしている
    if (fileCheck === undefined) {
      await db.dish
        .create({
          dishId,
          dishName: req.body.dishName,
          dishFile: null,
          dishUrl: req.body.dishUrl,
          dishGenre: req.body.dishGenre,
          dishRole: req.body.dishRole,
          createdBy: req.user.name.id,
          updatedAt
        })
        .catch((err: Error) => {
          next(err)
        })
      res.redirect('/mypage/menu')
    } else {
      // fileあり
      await db.dish
        .create({
          dishId,
          dishName: req.body.dishName,
          dishFile: req.file.Location || null,
          dishUrl: req.body.dishUrl,
          dishGenre: req.body.dishGenre,
          dishRole: req.body.dishRole,
          createdBy: req.user.name.id,
          updatedAt
        })
        .catch((err: Error) => {
          next(err)
        })

      res.redirect('/mypage/menu')
    }
  }
)

// 楽天はFileが必ずあるのでfileCheckしない
router.post('/rakuten', csrfProtection, async (req: any, res: Response, next: NextFunction) => {
  const dishId = uuid.v4()
  await db.dish
    .create({
      dishId,
      dishName: req.body.dishName,
      dishFile: req.body.dishFile,
      dishUrl: req.body.dishUrl,
      dishGenre: req.body.dishGenre,
      dishRole: req.body.dishRole,
      createdBy: req.user.name.id,
      updatedAt
    })
    .catch((err:Error) => {
      next(err)
    })

  res.redirect('/mypage/menu')
})

module.exports = router
