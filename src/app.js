const express = require('express');
const { productRouter } = require('./routes/productsRouter');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const { viewsUser } = require('./routes/routerViews/viewUser');
const { userRouter, usersArray } = require('./routes/userRouter');
const { cartRouter } = require('./routes/cartRouter');
const { Server } =  require('socket.io');
const { viewSocket } = require('./routes/routerViews/viewSocket');

const app = express();
const port = process.env.PORT || 8080;

// Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static( __dirname + '/public' ))

// Middle y manejo de errores
app.use(cookieParser())
app.use(( err , req , res , next ) => {
    console.log(err);
    res.status(500).send('Hubo un error en la ruta.')
})

// Views de products 
app.use('/api/products' , productRouter)

// Views de usuario 1
app.use('/api/users' , userRouter)

// Views de usuario 2
app.use('/views/user' , viewsUser)

// Views de socket
app.use('/views/socket' , viewSocket)

// Views de Cart
app.use('/api/carts' , cartRouter)

const httpServer = app.listen(port, (err) => {
    if(err) return console.log("El servidor falló, vuelva a intentar nuevamente.");
    console.log(`Servidor escuchando en el puerto ${port}`);
})

// Socket SV
const io = new Server(httpServer)
const messages = []

io.on('connection' , socket => {
    console.log("Usuario conectado");

    socket.on('message' , data => {
        messages.push(data)
        
        io.emit('messageLogs' , messages)
    })

    socket.on('userAuthenticated', data => {
        socket.broadcast.emit('newUser' , data)
    })
})





