const express = require('express')
const router = express.Router()

router.post('/', (req, res, next) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
