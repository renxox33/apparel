const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const router = require('./router')
const store = require('./store/store')
const path=require('path')

const PORT = process.env.PORT || 5000
const passport = require('passport')
const cors = require('cors')

const frontEndPath = __dirname.substr(0, __dirname.length - 7);

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json());

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(frontEndPath, 'apparel/build')))

    app.get('*', (req,res) => {

        res.sendFile(path.join(frontEndPath, 'apparel/build', 'index.html'))
    })
}

app.use(session({
    secret: store.EXPRESS_SESSION_SECRET,
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
