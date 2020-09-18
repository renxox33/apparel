const router = require('express').Router()
const passport = require('passport')
const mongoose = require('mongoose')
const User = require('./models/User')
const bcrypt = require('bcrypt')
const store = require('./store/store')

const passportStrategy = require('./authentication/passportStrategy')

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
    res.json({ authenticated: isAuthenticated })
})

router.post('/register', async (req, res) => {
    const { nickName, email, password } = req.body

    User.findOne({ email: email }, async (err, user) => {
        if(err){
            res.send(401).send('Error occured in database lookup:', err)
        } else{
            if(user){
                res.json({
                    alreadyRegistered: true,
                    nickName: user.nickName
                })
            } else{
                try {
                    bcrypt.hash(password, store.HASH_SALT_ROUNDS, async (err, hashedPass) => {
                        if(err){
                            res.status(500).json({ serverError: true,
                                                   error: err})
                        }else{
                            const newUser = new User({
                                nickName, email, password: hashedPass
                            })
                        
                            await newUser.save((err, user) => {
                                if(err){
                                    console.log('Insert error', err)
                                    res.status(500).json({
                                        errorType: 'Insert error',
                                        error: err
                                    })
                                } else{
                                    res.send(user)
                                }
                            })
                        }
                    })      
                } catch (error) {
                        res.status(500).json({
                            errorEncountered: true,
                            error: error
                })
               }
                       
            }
            
        }
    })
})

module.exports = router