const express = require('express');
const path = require('path');
const { Server } =  require('socket.io');
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const { objConfig } = require('./config/config');
const { routerApp } = require('./routes');
const { logger } = require('./utils/logger');

const app = express()

const portEnv = objConfig.port


// Handlebars

app.engine('handlebars', handlebars.engine({handlebars: allowInsecurePrototypeAccess(Handlebars)}))
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


// JSON

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Loggers

/* app.use(addLogger) */

app.use(routerApp)

exports.initServer = app.listen(portEnv, (err) => {
    if(err) return logger.fatal('El servidor falló. Intentelo más tarde.');
    logger.info(`Servidor escuchando en el puerto ${portEnv}`);
})

app.get('/' , async ( req , res ) => {
    res.redirect('/home')
})

app.use(express.static( path.resolve(__dirname, '../public') ))