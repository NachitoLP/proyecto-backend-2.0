const {Router} = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { create } = require('connect-mongo')

const { userRouter } = require('./routers/userRouter');
const { cartRouter } = require('./routers/cartRouter');
const { viewSocket } = require('./routerViews/viewSocket');
const { realTimeProducts } = require('./routerViews/viewRealProducts');
const { productRouter } = require('./routers/productsRouter');
const { cookieRouter } = require('./routers/cookiesRouter');
const { sessionRouter } = require('./routers/sessionRouter');
const { objConfig } = require('../config/config');
const { homeRouter } = require('./routers/homeRouter');

const routerApp = Router()

// Middle y manejo de errores
routerApp.use(cookieParser('L0p3s3Rcer¿T@'))

// Session
routerApp.use(session({
    store: create({
        mongoUrl: objConfig.url,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 100000*24,
    }),
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true
}))

// Cookies Route
routerApp.use('/api/cookie' , cookieRouter)

routerApp.use('/session' , sessionRouter)

// Views de home
routerApp.use('/home' , homeRouter)

// Views de products 
routerApp.use('/api/products' , productRouter)

// Socket products
routerApp.use('/api/realtimeproducts' , realTimeProducts)

// Views de usuario 1
routerApp.use('/api/users' , userRouter)

// Views de socket
routerApp.use('/views/socket' , viewSocket)

// Views de Cart
routerApp.use('/api/carts' , cartRouter)

routerApp.use(( err , req , res , next ) => {
    console.log(err);
    res.status(500).send('Hubo un error en la ruta.')
})

module.exports = {
    routerApp
}