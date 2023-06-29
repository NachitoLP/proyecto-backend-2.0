const { Router } = require('express');
const { logger } = require('../../utils/logger');
const loggerRouter = Router();

loggerRouter.get('/' , async ( req , res ) => {
    let prueba = `
        ${logger.debug("Soy un debug.")}
        ${logger.info("Soy un info.")}
        ${logger.warning("Soy un warning.")}
        ${logger.error("Soy un error.")}
        ${logger.fatal("Soy un fatal.")}
    `
    res.send({
        status: "Success",
        message: "Mirá la consola..."
    })
})

module.exports = loggerRouter