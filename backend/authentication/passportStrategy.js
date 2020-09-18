const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const store = require('../store/store')
const User = require('../models/User')


mongoose.connect(store.MONGO_CONN_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

module.exports.localStrategyInit = (passport) => {
    
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        function(email, password, done){
            User.findOne({ email: email }, (err, existingUser) => {
                if(err){
                    return done(err, null)
                }else{
                    if(existingUser){
                        bcrypt.compare(password, existingUser.password, (err, result) => {
                            if(err){
                                return done(err, null)
                            } else{
                                if(result){
                                    return done(null, existingUser)
                                } else{
                                    return done(null, false, { message: 'Authentication failed' })
                                }
                            }
                        })
                    } else{
                        return done(null, false, { message: 'Authentication failed' })
                    }
                }
            })
        }
    ))
}



module.exports.googleStrategyInit = (passport) => {
    passport.use( new GoogleStrategy({
        clientID: store.CLI_ID,
        clientSecret: store.CLI_SEC,
        callbackURL: store.SERVER_URL + '/sign-in-with-google/googleAuth'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }, async (err, existingUser) => {
            if(err){
                return done(err, null)
            } else{
                if(existingUser){
                    return done(null, existingUser)
                }else{
                    const newUser = new User({
                        nickName: profile.name.givenName,
                        googleId: profile.id
                    })

                    await newUser.save((err, result) => {
                        if(err){
                            return done(err, null)
                        } else{
                            if(result){
                                console.log(result)
                                return done(null, newUser)
                            } else{
                                return done(null, false, { message: 'Failed to insert user' })
                            }
                        }
                    })
                }
            }
        })
    }
    ))
}

passport.serializeUser((user, done) => {
    return done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, existingUser) => {
        if(err){
            return done(err, null)
        } else{
            if(existingUser){
                return done(null, existingUser)
            }
        }
    })
})

