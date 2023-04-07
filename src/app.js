const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { Server } =  require('socket.io');

const { productRouter } = require('./routes/productsRouter');
const handlebars = require('express-handlebars');
const { viewsUser } = require('./routes/routerViews/viewUser');
const { userRouter } = require('./routes/userRouter');
const { cartRouter } = require('./routes/cartRouter');
const { viewSocket } = require('./routes/routerViews/viewSocket');
const { realTimeProducts } = require('./routes/routerViews/viewRealProducts');
const { ProductManager } = require('./managers/productManager');

const app = express();
const port = process.env.PORT || 8080;

// Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static( path.resolve(__dirname, '../public') ))

// Middle y manejo de errores
app.use(cookieParser())

// Views de products 
app.use('/home' , productRouter)

// Socket products
app.use('/realtimeproducts' , realTimeProducts)

// Views de usuario 1
app.use('/api/users' , userRouter)

// Views de usuario 2
app.use('/views/user' , viewsUser)

// Views de socket
app.use('/views/socket' , viewSocket)

// Views de Cart
app.use('/api/carts' , cartRouter)

app.use(( err , req , res , next ) => {
    console.log(err);
    res.status(500).send('Hubo un error en la ruta.')
})

const httpServer = app.listen(port, (err) => {
    if(err) return console.log("El servidor falló, vuelva a intentar nuevamente.");
    console.log(`Servidor escuchando en el puerto ${port}`);
})

// Socket Chat

/* const ioChat = new Server(httpServer)
const messages = []

ioChat.on('connection' , socket => {
    console.log("Usuario conectado");

    socket.on('message' , data => {
        messages.push(data)
        
        ioChat.emit('messageLogs' , messages)
    })

    socket.on('userAuthenticated', data => {
        socket.broadcast.emit('newUser' , data)
    })
})
 */

// RealTime

let productManager = new ProductManager()

const ioReal = new Server(httpServer)

ioReal.on('connection' , socket => {
    console.log("Usuario conectado")

    socket.on('newProduct' , async data => {
        const newProduct = data
        let newArray = await productManager.addProduct(newProduct)

        ioReal.emit('newArrayProducts' , newArray)
    })

})






