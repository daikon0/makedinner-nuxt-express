const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require('../models/index')
const jsonParser = bodyParser.json()

// user情報取得
router.get('/user', (req, res) => {
  if (req.user) {
    res.send(req.user)
  } else {
    res.redirect('/signin')
  }
})

// メニュー一覧表示
router.get('/menu', async (req, res, next) => {
  const dish = await db.dish
    .findAll({
      where: { createdBy: req.user.name.id },
      order: [['"updatedAt"', 'DESC']]
    })
    .catch((err) => {
      next(err)
    })
  res.send(dish)
})

// 料理の画面表示
router.get('/menu/:dishId', async (req, res, next) => {
  const dish = await db.dish
    .findOne({
      where: { dishId: req.params.dishId }
    })
    .catch((err) => {
      next(err)
    })
  res.send(dish)
})

// 料理の編集
router.post('/menu/:dishId/edit', jsonParser, async (req, res, next) => {
  const dish = await db.dish
    .findOne({
      where: { dishId: req.params.dishId }
    })
    .catch((err) => {
      next(err)
    })
  dish
    .update({
      dishName: req.body.dishName,
      dishUrl: req.body.dishUrl
    })
    .catch((err) => {
      next(err)
    })
  res.redirect('/mypage/menu')
})

// 料理の削除
router.post('/menu/:dishId/delete', async (req, res, next) => {
  await deleteDish(req.params.dishId).catch((err) => {
    next(err)
  })
  res.redirect('/mypage/menu')
})

async function deleteDish(dishId, done, err) {
  const dish = await db.dish.findAll({
    where: { dishId }
  })
  const promises = dish.map((d) => {
    return d.destroy()
  })
  return Promise.all(promises)
}

module.exports = router
