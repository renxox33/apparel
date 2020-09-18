const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const ca_reg_user = new mongoose.Schema({
    nickName:{
        type: String,
    },
    email:{
        type:String
    },
    password:{
        type:String,
    },
    googleId: {
        type:Number
    }
})

ca_reg_user.plugin(passportLocalMongoose)

module.exports = mongoose.model('ca_reg_user', ca_reg_user)