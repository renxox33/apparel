if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const store = {
    MONGO_CONN_STRING: process.env.MONGO_CONN_STRING,
    MAIN_HOST_URL: process.env.MAIN_HOST_URL,
    SERVER_URL: process.env.SERVER_URL,
    HASH_SALT_ROUNDS: process.env.HASH_SALT_ROUNDS,
    CLI_ID: process.env.APP_CLIENT_ID,
    CLI_SEC: process.env.APP_CLIENT_SECRET,
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET
}

module.exports = store