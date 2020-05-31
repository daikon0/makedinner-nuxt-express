const express = require('express')
const router = express.Router()

// storにuser情報を渡す
router.get('/', (req, res, next) => {
  res.json({ user: req.user })
})

module.exports = router
