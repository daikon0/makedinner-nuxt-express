const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require('../models/index')
const jsonParser = bodyParser.json()

router.get('/user', (req, res) => {
  if (req.user) {
    res.send(req.user)
  } else {
    res.redirect('/signin')
  }
})

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

module.exports = router
