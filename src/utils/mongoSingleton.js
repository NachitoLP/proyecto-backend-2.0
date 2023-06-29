const { connect } = require('mongoose');
const { logger } = require('./logger');
class MongoSingleton {
    static #instance

    constructor() {
        connect('mongodb+srv://Joaquin:joaquin030203@proyectdb.eauw9yn.mongodb.net/ecommerce?retryWrites=true&w=majority' , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    static getInstance() {
        if (this.#instance) {
            logger.info('Base de datos ya conectada anteriormente.')
            return this.#instance
        }
        this.#instance = new MongoSingleton()
        logger.info('Base de datos conectada.')
        
        return this.#instance
    }
}

module.exports = MongoSingleton