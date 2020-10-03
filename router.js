const router = require('express').Router()
const passport = require('passport')
const mongoose = require('mongoose')
const User = require('./models/User')
const bcrypt = require('bcrypt')
const store = require('./store/store')
const ShopItems = require('./models/ShopItems')

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

        user = req.user

        const response = {
            authenticated: true,
            status: 'Success',
            name: req.user.nickName,
            id: req.user._id,
            cart: req.user.cart
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

router.post('/sign-in-with-google', passport.authenticate('google', { scope: ['profile'] }))

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

router.post('/sign-out', (req, res) => {

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

router.get('/fetch-shop-items', async (req, res) => {

    try {
        
        const items = await ShopItems.findOne()
        res.json({ item: items })
    } catch (error) {
        console.log(error)
    }
})

router.post('/save-cart-to-db', async (req, res) => {

    const { user, cartItems } = req.body

    //if user is signed in, push cart to db, else do nothing
    if(user !== null){
        try {        
            const userToUpdate = await User.findOneAndUpdate({ _id: user.id }, { cart: cartItems }, { useFindAndModify: false } )
            if(userToUpdate){
                res.status(200).json({ message: 'success' })
            }else{
                res.status(500).json({ message: 'Error occurred while saving cart' })
            }

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
})

module.exports = router