const express = require('express');
const path = require('path');
const { Server } =  require('socket.io');
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const { objConfig } = require('./config/config');
const { routerApp, mid1 } = require('./routes');
const { ProductManagerMongo } = require('./dao/productManagerMongo');
const { MsgModelMongo } = require('./dao/chatManager');
objConfig.connectDB()

const app = express();

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

let msgModel = new MsgModelMongo()
const ioChat = new Server(httpServer)
const messages = []

ioChat.on('connection' , socket => {
    /* console.log("Usuario conectado") */;

    socket.on('message' , data => {
        messages.push(data)
        msgModel.createMessage(data.user, data.message)
        ioChat.emit('messageLogs' , messages)
    })

    socket.on('userAuthenticated', data => {
        socket.broadcast.emit('newUser' , data)
    })
})


// RealTime

/* let productManager = new ProductManagerMongo()

const ioReal = new Server(httpServer)

ioReal.on('connection' , socket => {
    console.log("Usuario conectado")

    socket.on('newProduct' , async data => {
        const newProduct = data
        newProduct.status = true
        let newArray = await productManager.addProduct(newProduct)

        ioReal.emit('newArrayProducts' , newArray)
    })

}) */






