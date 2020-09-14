const keys = require('../../keys/O-AuthKeys')
const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy

const { clientId, clientSecret } = keys

var profileId = null

const initializeGooglePassport = (passport) => {
    passport.use( new googleStrategy({
        clientID: clientId,
        clientSecret: clientSecret,
        callbackURL: 'http://localhost:5000/sign-in-with-google/googleAuth'
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        profileId = profile.id

        return done(null, profileId)
    }
    ))
}


module.exports.profileId = profileId
module.exports.initializeGooglePassport = initializeGooglePassport



