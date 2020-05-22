const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/', async (req, res, next) => {
  const secret = process.env.RAKUTEN_SECRET
  await axios
    .get(
      `https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?applicationId=${secret}&categoryType=large`
    )
    .then((category) => {
      res.send(category.data.result.large)
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/category', async (req, res, next) => {
  const secret = process.env.RAKUTEN_SECRET
  await axios
    .get(
      `https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?applicationId=${secret}&categoryType=large`
    )
    .then((category) => {
      res.send(category.data.result.large)
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/ranking', async (req, res, next) => {
  const secret = process.env.RAKUTEN_SECRET
  const categoryId = req.query.categoryId
  await axios
    .get(
      `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${secret}&categoryId=${categoryId}`
    )
    .then((recipes) => {
      res.send(recipes.data.result)
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/recipe', async (req, res, next) => {
  const secret = process.env.RAKUTEN_SECRET
  const categoryId = req.query.categoryId
  await axios
    .get(
      `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${secret}&categoryId=${categoryId}`
    )
    .then((recipes) => {
      res.send(recipes.data.result)
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/recipe/edit', async (req, res, next) => {
  const secret = process.env.RAKUTEN_SECRET
  const categoryId = req.query.categoryId
  await axios
    .get(
      `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${secret}&categoryId=${categoryId}`
    )
    .then((recipes) => {
      res.send(recipes.data.result)
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
