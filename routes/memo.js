const express = require('express')
const router = express.Router()
const db = require('../models/index')

router.post('/', async (req, res, next) => {
  await db.memo
    .create({
      name: req.body.name,
      done: false,
      createdBy: req.user.name.id
    })
    .then(() => {
      res.redirect('/mypage/memo')
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
