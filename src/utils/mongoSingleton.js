const { connect } = require('mongoose');
const { logger } = require('./logger');
const { objConfig } = require('../config/config');
class MongoSingleton {
    static #instance

    constructor() {
        connect(objConfig.mongoURL , {
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