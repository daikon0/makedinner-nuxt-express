const express = require('express')
const router = express.Router()
const db = require('../models/index')

router.get('/user', (req, res) => {
  if (req.user) {
    res.send(req.user)
  } else {
    res.redirect('/signin')
  }
})

router.get('/menu', async (req, res, next) => {
  const dish = await db.dish.findAll({
    where: { createdBy: req.user.name.id },
    order: [['"updatedAt"', 'DESC']]
  })
  res.send(dish)
})

module.exports = router
