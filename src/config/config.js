const { connect } = require('mongoose');
let url = 'mongodb+srv://Joaquin:joaquin030203@proyectdb.eauw9yn.mongodb.net/ecommerce?retryWrites=true&w=majority'
require('dotenv').config()

const objConfig = {
    port: process.env.PORT || 8080,
    mongoURL: process.env.MONGO_URL || 'mongodb+srv://Joaquin:joaquin030203@proyectdb.eauw9yn.mongodb.net/ecommerce?retryWrites=true&w=majority' ,
    adminName: process.env.ADMIN || '',
    adminPassword: process.env.PASSWORD || '',
    connectDB: async () => {
        try {
            await connect(url)
            console.log("Base de datos conectada");
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = {
    objConfig
}