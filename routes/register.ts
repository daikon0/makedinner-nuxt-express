import express, { Request, Response, NextFunction } from 'express'
import Crypto from 'crypto'
import csrf from 'csurf'

const csrfProtection = csrf({ cookie: true })
const router = express.Router()
const db = require('../models/index')

router.post('/', csrfProtection, async (req: Request, res: Response, next: NextFunction) => {
  const id = getSecureRandom()
  await db.user
    .create({
      id,
      username: req.body.username,
      password: req.body.password
    })
    .catch((err: Error) => {
      next(err)
    })
  res.redirect('/')
})

function getSecureRandom() {
  const buff = Crypto.randomBytes(4)
  const hex = buff.toString('hex')
  return parseInt(hex, 16)
}

module.exports = router
