const MongoSingleton = require('../utils/mongoSingleton');
require('dotenv').config()

const objConfig = {
    persistence: process.env.PERSISTENCE,
    port: process.env.PORT,
    mongoURL: process.env.MONGO_URL,
    adminName: process.env.ADMIN || '',
    adminPassword: process.env.PASSWORD || '',
    gmail_user: process.env.GMAIL_USER,
    gmail_pass: process.env.GMAIL_URL,
    twilio_account_ID: process.env.ACCOUNT_ID,
    twilio_auth_ID: process.env.AUTH_TOKEN,
    twilio_phone: process.env.TWILIO_PHONE,
    my_phone: process.env.JOAQUIN_PHONE,
    dbConnection: async() => {
        MongoSingleton.getInstance()
    }
}

module.exports = {
    objConfig
}
