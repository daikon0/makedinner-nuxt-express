const express = require('express')
const router = express.Router()
const db = require('../models/index')

router.get('/', async (req, res, next) => {
  const memos = await db.memo
    .findAll({
      where: { createdBy: req.user.name.id },
      order: [['"createdAt"', 'DESC']]
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

router.post('/delete', async (req, res, next) => {
  await deleteMemo(req.body.memoId).catch((err) => {
    next(err)
  })
  res.redirect('/mypage/memo')
})

router.post('/deleteAll', async (req, res, next) => {
  await deleteAll(req.user.name.id).catch((err) => {
    next(err)
  })
  res.redirect('/mypage/memo')
})

async function deleteMemo(id, done, err) {
  const memo = await db.memo.findAll({
    where: { id }
  })
  const promises = memo.map((d) => {
    return d.destroy()
  })
  return Promise.all(promises)
}

async function deleteAll(createdBy, done, err) {
  const memo = await db.memo.findAll({
    where: { createdBy }
  })
  const promises = memo.map((d) => {
    return d.destroy()
  })
  return Promise.all(promises)
}

module.exports = router
