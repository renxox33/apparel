const router = require('express').Router()
const passport = require('passport')
const mongoose = require('mongoose')
const User = require('./models/User')
const bcrypt = require('bcrypt')
const store = require('./store/store')

const passportStrategy = require('./authentication/passportStrategy')

var user = null
var isAuthenticated = false

mongoose.connect(store.MONGO_CONN_STRING, { 
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to mongo db'))

passportStrategy.localStrategyInit(passport)
passportStrategy.googleStrategyInit(passport)

router.post('/sign-in-with-email', passport.authenticate('local'), (req, res) => {

    if(req.isAuthenticated()){

        const response = {
            authenticated: true,
            status: 'Success',
            name: req.user.nickName,
            id: req.user._id
        }    

        res.json(response)
    }else{

        isAuthenticated = false
        user = null
        const response = {
            authenticated: false,
            status: 'Failed',
            message: 'Wrong email/password entered'
        }

        res.json(response)
    }
})

router.get('/sign-in-with-google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/sign-in-with-google/googleAuth', passport.authenticate('google', { failureRedirect: '/sign-in-with-google-failed' }), (req,res) => {

    if(req.isAuthenticated()){
        isAuthenticated = true
        user = req.user
        res.redirect(store.MAIN_HOST_URL)
    }else{
        isAuthenticated = false
        res.redirect('/sign-in-with-google-failed')
    }  
})

router.get('/sign-in-with-google-failed', (req,res) => {
    const response = {
        authenticated: false,
        status: 'Failed',
        message: 'Google authentication failed'
    }
    res.json(response)
})

router.post('/fetchGoogleUserInfo', (req, res) => {

    console.log(user)
        
        if(user){
            res.json({
                authenticated: true,
                name: user.nickName,
                id: user._id
            })
        } else{            
            res.json({
                authenticated: false,
                user: null
            })
        }
})

router.get('/sign-out', (req, res) => {

    user = null
    req.logOut()
    res.json({ authenticated: isAuthenticated, user: null })
})

router.post('/register', async  (req, res) => {
    
    const { nickName, email, password } = req.body
    
    const userFound = await User.findOne({ email: email }).exec()
    
    if(userFound !== null){
        res.json({
            alreadyRegistered: true,
            nickName: userFound.nickName
        })
    } else{

        try{
            const salt = bcrypt.genSaltSync(Number(store.HASH_SALT_ROUNDS))
            const hashedPassword = await bcrypt.hashSync(password, salt)
            const newUser = new User({
                nickName,
                email,
                password: hashedPassword
            })

            const user = await newUser.save()
            res.json({ 
                alreadyRegistered: false,
                registration: 'success',
                nickName: user.nickName,
                id: user._id
             })
        }catch(error){
            console.log(error.message)
        }
    }
})

module.exports = router