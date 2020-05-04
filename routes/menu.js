const express = require('express')
const router = express.Router()
const db = require('../models/index')

router.get('/mypage/menu', async (req, res, next) => {
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

module.exports = router
