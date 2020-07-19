import express, { Request, Response, NextFunction } from 'express'
import csrf from 'csurf'

const router = express.Router()
const csrfProtection = csrf({ cookie: true })

const db = require('../models/index')

router.get('/', async (req: any, res: Response, next: NextFunction) => {
  const memos = await db.memo
    .findAll({
      where: { createdBy: req.user.name.id },
      order: [['"createdAt"', 'DESC']]
    })
    .catch((err: Error) => {
      next(err)
    })
  res.send(memos)
})

router.post('/', csrfProtection, async (req: any, res: Response, next: NextFunction) => {
  await db.memo
    .create({
      name: req.body.name,
      done: false,
      createdBy: req.user.name.id
    })
    .then(() => {
      res.redirect('/mypage/memo')
    })
    .catch((err: Error) => {
      next(err)
    })
})

router.post('/edit', csrfProtection, async (req: any, res: Response, next: NextFunction) => {
  const memo = await db.memo
    .findOne({
      where: { id: req.body.memoId }
    })
    .catch((err: Error) => {
      next(err)
    })
  memo
    .update({
      done: !memo.done
    })
    .catch((err: Error) => {
      next(err)
    })
  res.redirect('/mypage/memo')
})

router.post('/delete', csrfProtection, async (req: any, res: Response, next: NextFunction) => {
  await deleteMemo(req.body.memoId).catch((err: Error) => {
    next(err)
  })
  res.redirect('/mypage/memo')
})

router.post('/deleteAll', csrfProtection, async (req: any, res: Response, next: NextFunction) => {
  await deleteAll(req.user.name.id).catch((err: Error) => {
    next(err)
  })
  res.redirect('/mypage/memo')
})

async function deleteMemo(id: bigint) {
  const memo = await db.memo.findAll({
    where: { id }
  })
  const promises = memo.map((d: any) => {
    return d.destroy()
  })
  return Promise.all(promises)
}

async function deleteAll(createdBy: bigint) {
  const memo = await db.memo.findAll({
    where: { createdBy }
  })
  const promises = memo.map((d: any) => {
    return d.destroy()
  })
  return Promise.all(promises)
}

module.exports = router
