const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000

const passport = require('passport')
const cors = require('cors')
const googlePassport = require('./googleAuth/googleAuth')

googlePassport.initializeGooglePassport(passport)

// app.use(cors())
app.use(passport.initialize())

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')

    if(req.method === 'OPTIONS'){
        req.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH')
        return res.status(200).json({})
    }
    next()
})
  

app.post('/backendRequest', (req, res) => {
    const { email, password } = req.query
    res.send({ email, password })
})

app.get('/sign-in-with-google', passport.authenticate('google', { scope: ['profile'] }))

app.get('/sign-in-with-google/googleAuth', passport.authenticate('google', { failureRedirect: '/backendRequest' }), (req,res) => {
    console.log('Logged from express')
})

app.listen(PORT, () => console.log('Express server is running on port ' + PORT))
