const express = require('express')
const router = express.Router()
const db = require('../models/index')

router.get('/', async (req, res, next) => {
  const memos = await db.memo
    .findAll({
      where: { createdBy: req.user.name.id },
      order: [['"updatedAt"', 'DESC']]
    })
    .catch((err) => {
      next(err)
    })
  res.send(memos)
})

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

router.post('/edit', async (req, res, next) => {
  const memo = await db.memo
    .findOne({
      where: { id: req.body.memoId }
    })
    .catch((err) => {
      next(err)
    })
  memo
    .update({
      done: !memo.done
    })
    .catch((err) => {
      next(err)
    })
  res.redirect('/mypage/memo')
})

module.exports = router
