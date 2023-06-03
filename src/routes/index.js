const {Router} = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { create } = require('connect-mongo')
const passport = require('passport');

const { userRouter } = require('./routers/userRouter');
const { cartRouter } = require('./routers/cartRouter');
const { viewSocket } = require('./routerViews/viewSocket');
const { realTimeProducts } = require('./routerViews/viewRealProducts');
const { productRouter } = require('./routers/productsRouter');
const { cookieRouter } = require('./routers/cookiesRouter');
const { sessionRouter } = require('./routers/sessionRouter');
const { objConfig } = require('../config/config');
const { homeRouter } = require('./routers/homeRouter');
const { initializePassport } = require('../config/passportConfig');
const { ordersRouter } = require('./routers/ordersRouter');
const mailRouter = require('./routers/mailRouter');
const smsRouter = require('./routers/smsRouter');

const routerApp = Router()

// Middle y manejo de errores
routerApp.use(cookieParser('L0p3s3Rcer¿T@'))

// Session
routerApp.use(session({
    store: create({
        mongoUrl: objConfig.mongoURL,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 100,
    }),
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true
}))

let mid1 = function (req , res , next)  {
    try {
        if (!req.session.user) {
            return res.redirect('/session/login')
        }
        next()
    } catch (error) {
        console.log(error);
    }
}
initializePassport()
routerApp.use(passport.initialize())
routerApp.use(passport.session())


// Cookies Route
routerApp.use('/api/cookie' , mid1 , cookieRouter)

routerApp.use('/session', sessionRouter)

// Views de home
routerApp.use('/home' , mid1 , homeRouter)

// Views de products 
routerApp.use('/api/products' , mid1 , productRouter)

// Socket products
routerApp.use('/api/realtimeproducts' , mid1 , realTimeProducts)

// Views de usuario 1
routerApp.use('/api/users' , mid1 , userRouter)

// Views de socket
routerApp.use('/views/socket' , mid1 , viewSocket)

// Views de Cart
routerApp.use('/api/carts' , mid1 , cartRouter)

// Views de Order
routerApp.use('/api/orders', mid1, ordersRouter)

// View de Mail
routerApp.use('/api/mail' , mid1 , mailRouter)

// View de SMS
routerApp.use('/api/sms' , mid1 , smsRouter)

routerApp.use(( err , req , res , next ) => {
    console.log(err);
    res.status(500).send('Hubo un error en la ruta.')
})

module.exports = {
    routerApp,
    mid1
}