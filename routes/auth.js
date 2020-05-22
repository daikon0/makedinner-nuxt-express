const express = require('express')
const router = express.Router()
const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy

const db = require('../models/index')

localAuth()
router.post(
  '/local',
  passport.authenticate('local', {
    successRedirect: '/callback',
    failureRedirect: '/retry',
    session: true
  })
)

function localAuth() {
  handleSession()
  passport.use(
    'local',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password'
      },
      function(username, password, done) {
        process.nextTick(() => {
          db.user
            .findOne({
              where: { username, password }
            })
            .then((user, err) => {
              if (err) {
                return done(err)
              }
              if (!user) {
                return done(null, false, {
                  message: 'usernameまたはpasswordが間違っています'
                })
              }
              return done(null, user)
            })
        })
      }
    )
  )
}

function handleSession() {
  passport.serializeUser(function(username, done) {
    done(null, username)
  })
  passport.deserializeUser(function(username, done) {
    done(null, { name: username })
  })
}

module.exports = router
