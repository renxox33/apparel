require('dotenv').config()

const store = {
    MONGO_CONN_STRING: 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PW + '@cluster0.3zpqz.mongodb.net/' + process.env.DB_NAME + '?retryWrites=true&w=majority',
    MAIN_HOST_URL: 'http://localhost:3000',
    SERVER_URL:'http://localhost:5000',
    HASH_SALT_ROUNDS: 10,
    CLI_ID: process.env.APP_CLIENT_ID,
    CLI_SEC: process.env.APP_CLIENT_SECRET
}

module.exports = store