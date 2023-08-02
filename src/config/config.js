const dotenv = require('dotenv')
const commander = require('../utils/commander')

const { mode } = commander.opts()

dotenv.config({
    path: mode == 'development' ? './.env.development' : './.env.production'
})

const objConfig = {
    persistence: process.env.PERSISTENCE,
    port: process.env.PORT,
    mongoURL: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME || '',
    adminPassword: process.env.ADMIN_PASSWORD || '',
    gmail_user: process.env.GMAIL_USER,
    gmail_pass: process.env.GMAIL_URL,
    twilio_account_ID: process.env.ACCOUNT_ID,
    twilio_auth_ID: process.env.AUTH_TOKEN,
    twilio_phone: process.env.TWILIO_PHONE,
    my_phone: process.env.JOAQUIN_PHONE,
    private_key: process.env.PRIVATE_KEY || "CoderKey123"
}

module.exports = {
    objConfig
}
