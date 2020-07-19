import express, { Request, Response, NextFunction } from 'express'
import axios from 'axios'

const router = express.Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const secret = process.env.RAKUTEN_SECRET
  await axios
    .get(
      `https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?applicationId=${secret}&categoryType=large`
    )
    .then((category) => {
      res.send(category.data.result.large)
    })
    .catch((err: Error) => {
      next(err)
    })
})

router.get('/category', async (req: Request, res: Response, next: NextFunction) => {
  const secret = process.env.RAKUTEN_SECRET
  await axios
    .get(
      `https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?applicationId=${secret}&categoryType=large`
    )
    .then((category) => {
      res.send(category.data.result.large)
    })
    .catch((err: Error) => {
      next(err)
    })
})

router.get('/ranking', async (req: Request, res: Response, next: NextFunction) => {
  const secret = process.env.RAKUTEN_SECRET
  const categoryId = req.query.categoryId
  await axios
    .get(
      `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${secret}&categoryId=${categoryId}`
    )
    .then((recipes) => {
      res.send(recipes.data.result)
    })
    .catch((err: Error) => {
      next(err)
    })
})

router.get('/recipe', async (req: Request, res: Response, next: NextFunction) => {
  const secret = process.env.RAKUTEN_SECRET
  const categoryId = req.query.categoryId
  await axios
    .get(
      `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${secret}&categoryId=${categoryId}`
    )
    .then((recipes) => {
      res.send(recipes.data.result)
    })
    .catch((err: Error) => {
      next(err)
    })
})

router.get('/recipe/edit', async (req: Request, res: Response, next: NextFunction) => {
  const secret = process.env.RAKUTEN_SECRET
  const categoryId = req.query.categoryId
  await axios
    .get(
      `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${secret}&categoryId=${categoryId}`
    )
    .then((recipes) => {
      res.send(recipes.data.result)
    })
    .catch((err: Error) => {
      next(err)
    })
})

module.exports = router
