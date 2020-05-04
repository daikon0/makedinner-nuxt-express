const Crypto = require('crypto')
function getSecureRandom() {
  const buff = Crypto.randomBytes(4)
  const hex = buff.toString('hex')
  return parseInt(hex, 16)
}
const express = require('express')
const router = express.Router()
const db = require('../models/index')

router.post('/', async (req, res, next) => {
  const id = getSecureRandom()
  await db.user
    .create({
      id,
      username: req.body.username,
      password: req.body.password
    })
    .catch((err) => {
      next(err)
    })
  res.redirect('/')
})

module.exports = router
