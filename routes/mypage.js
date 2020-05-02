const express = require('express')
const router = express.Router()

router.get('/user', (req, res) => {
  if (req.user) {
    res.send(req.user)
  } else {
    res.redirect('/signin')
  }
})

module.exports = router
