const express = require('express')
const passport = require('passport')
const router = express.Router()

// ログイン処理を定義
router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/callback',
    failureRedirect: '/retry',
    session: true
  })
)

module.exports = router
