const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const router = require('./router')
const store = require('./store/store')

const secret = 'hellohelloasdasdasasdddddddddddddd'
const PORT = process.env.PORT || 5000
const passport = require('passport')
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json());

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
    origin: store.MAIN_HOST_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}))

app.use('/', router)

app.listen(PORT, () => console.log('Express server is running on port ' + PORT))
