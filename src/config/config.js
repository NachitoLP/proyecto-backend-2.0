const { connect } = require('mongoose');
const MongoSingleton = require('../utils/mongoSingleton');
require('dotenv').config()

const objConfig = {
    persistence: process.env.PERSISTENCE,
    port: process.env.PORT,
    mongoURL: process.env.MONGO_URL,
    adminName: process.env.ADMIN || '',
    adminPassword: process.env.PASSWORD || '',
    dbConnection: async() => {
        MongoSingleton.getInstance()
    }
}

module.exports = {
    objConfig
}