const session = require('express-session')
const connectMongo = require('connect-mongo')
require('dotenv').config()

const MongoStore = connectMongo.default || connectMongo

const options = {
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
  name: process.env.SESSION_COLLECTION,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
  },
}

const initSession = (app) => {
  app.use(session(options))
}

module.exports = { initSession }