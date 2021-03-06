const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const helmet = require('helmet')
app.use(helmet())

const session = require('express-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const mypageRouter = require('../tsdist/mypage')
const registerRouter = require('../tsdist/register')
const createDishRouter = require('../tsdist/createDish')
const signoutRouter = require('../tsdist/signout')
const callbackRouter = require('../tsdist/callback')
const authRouter = require('../tsdist/auth')
const memoRouter = require('../tsdist/memo')
const rakutenRouter = require('../tsdist/rakuten')
const csrfRouter = require('../tsdist/csrf')

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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/routes/mypage', mypageRouter)
app.use('/routes/signout', signoutRouter)
app.use('/routes/register', registerRouter)
app.use('/routes/createDish', createDishRouter)
app.use('/routes/callback', callbackRouter)
app.use('/routes/auth', authRouter)
app.use('/routes/memo', memoRouter)
app.use('/routes/rakuten', rakutenRouter)
app.use('/routes/csrf', csrfRouter)

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
