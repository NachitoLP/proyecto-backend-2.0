const express = require('express');
const path = require('path');
const { Server } =  require('socket.io');
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const { objConfig } = require('./config/config');
const { routerApp, mid1 } = require('./routes');
const initChatSocket = require('./utils/sockets/chatSocket');
const initReal = require('./utils/sockets/realTimeSocket');

const app = express()

objConfig.dbConnection()
objConfig.dbConnection()

const portEnv = objConfig.port


// Handlebars

app.engine('handlebars', handlebars.engine({handlebars: allowInsecurePrototypeAccess(Handlebars)}))
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


// JSON

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routerApp)

app.get('/' , mid1 , async ( req , res ) => {
    res.redirect('/home')
})

app.use(express.static( path.resolve(__dirname, '../public') ))


// Routes

const httpServer = app.listen(portEnv, (err) => {
    if(err) return console.log("El servidor falló, vuelva a intentar nuevamente.");
    console.log(`Servidor escuchando en el puerto ${portEnv}`);
})


// Socket Chat

const ioChat = new Server(httpServer)
initChatSocket(ioChat)


// RealTime

/* const ioReal = new Server(httpServer)
initReal(ioReal) */