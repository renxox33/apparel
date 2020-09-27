const router = require('express').Router()
const passport = require('passport')
const mongoose = require('mongoose')
const User = require('./models/User')
const bcrypt = require('bcrypt')
const store = require('./store/store')

const passportStrategy = require('./authentication/passportStrategy')
const { HASH_SALT_ROUNDS } = require('./store/store')

var user
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

router.post('/sign-in-with-email', passport.authenticate('local', { failureRedirect: '/sign-in-with-email-failed' }), (req, res) => {
    if(req.isAuthenticated()){
        isAuthenticated = true
        res.redirect('/sign-in-with-email-success')
    }else{
        isAuthenticated = false
        res.redirect('/sign-in-with-email-failed')
    }
})

router.get('/sign-in-with-email-success', (req,res) => {
    if(isAuthenticated){

        user = req.user

        const response = {
                authenticated: true,
                status: 'Success',
                name: user.nickName,
                id: user._id
            }    

        res.json(response)
     }
})

router.get('/sign-in-with-email-failed', (req,res) => {
    const response = {
        authenticated: false,
        status: 'Failed',
        message: 'Wrong email/password entered'
    }
    res.json(response)
})

router.get('/sign-in-with-google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/sign-in-with-google/googleAuth', passport.authenticate('google', { failureRedirect: '/sign-in-with-google-failed' }), (req,res) => {

    if(req.isAuthenticated()){
        isAuthenticated = true
        res.redirect('/sign-in-with-google-success')
    }else{
        isAuthenticated = false
        res.redirect('/sign-in-with-google-failed')
    }  
})

router.get('/sign-in-with-google-success', (req,res) => {
    if(isAuthenticated){

        user = req.user
        res.redirect(store.MAIN_HOST_URL)
     } else{
       res.json({
            authenticated: false,
            sattus: 'Failed',
            message: 'isAuthenticated returned false'
         })
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

router.post('/checkUserLoggedIn', (req, res) => {
        
        if(isAuthenticated){
            res.json({
                authenticated: true,
                name: user.nickName,
                id: user._id
            })
        } else{            
            res.json({
                authenticated: false
            })
        }
})

router.get('/sign-out', (req, res) => {
    req.logOut()
    isAuthenticated = false
    user = null
    res.json({ authenticated: isAuthenticated })
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