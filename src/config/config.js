const { connect } = require('mongoose');
const MongoSingleton = require('../utils/mongoSingleton');
require('dotenv').config()

const objConfig = {
    port: process.env.PORT || 8080,
    mongoURL: process.env.MONGO_URL || 'mongodb+srv://Joaquin:joaquin030203@proyectdb.eauw9yn.mongodb.net/ecommerce?retryWrites=true&w=majority' ,
    adminName: process.env.ADMIN || '',
    adminPassword: process.env.PASSWORD || '',
    dbConnection: async() => {
        MongoSingleton.getInstance()
    }
}


module.exports = {
    objConfig
}