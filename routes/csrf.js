const express = require('express')
const router = express.Router()

const csrf = require('csurf')
const csrfProtection = csrf({ cookie: true })

router.get('/', csrfProtection, (req, res, next) => {
  res.send(req.csrfToken())
})

module.exports = router
