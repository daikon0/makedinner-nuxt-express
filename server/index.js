const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

const session = require('express-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const LocalStrategy = require('passport-local').Strategy
const mypageRouter = require('../routes/mypage')
const signinRouter = require('../routes/signin')
const registerRouter = require('../routes/register')
const createDishRouter = require('../routes/createDish')
const db = require('../models/index')

require('dotenv').config()

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)
app.use(passport.initialize())
app.use(passport.session())

// passportとsessionの紐づけ
passport.serializeUser(function(username, done) {
  done(null, username)
})
passport.deserializeUser(function(username, done) {
  done(null, { name: username })
})

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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/mypage', mypageRouter)
app.use('/signin', signinRouter)
app.use('/register', registerRouter)
app.use('/createDish', createDishRouter)

app.get('/aacallback', (req, res, next) => {
  res.json({ user: req.user })
})

app.post('/signout', (req, res, next) => {
  req.logout()
  res.redirect('/')
})

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
