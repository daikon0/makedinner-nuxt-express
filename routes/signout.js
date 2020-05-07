const express = require('express')
const router = express.Router()

// ログイン処理を定義
router.post('/', (req, res, next) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
