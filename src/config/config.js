const { connect } = require('mongoose');
let url = 'mongodb+srv://Joaquin:joaquin030203@proyectdb.eauw9yn.mongodb.net/ecommerce?retryWrites=true&w=majority'

const objConfig = {
    connectDB: async () => {
        try {
            await connect(url)
            console.log("Base de datos conectada");
        } catch (error) {
            console.log(error);
        }
    },
    url: 'mongodb+srv://Joaquin:joaquin030203@proyectdb.eauw9yn.mongodb.net/ecommerce?retryWrites=true&w=majority'
}


module.exports = {
    objConfig
}