const {Router} = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { create } = require('connect-mongo')
const passport = require('passport');
const swaggerUiExpress = require('swagger-ui-express')

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
const { midSession } = require('../middleware/sessionMiddleware');
const compression = require('express-compression');
const mockingRouter = require('./routers/mockingProducts');
const loggerRouter = require('./routers/loggerTest');
const { specs } = require('../utils/swagger');

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


initializePassport()
routerApp.use(passport.initialize())
routerApp.use(passport.session())

routerApp.use(compression({
    brotli:{
        enabled: true,
        zlib: {}
    }
}))

// Cookies Route
routerApp.use('/api/cookie' , midSession , cookieRouter)

routerApp.use('/session', sessionRouter)

// Views de home
routerApp.use('/home' , homeRouter)

// Views de products 
routerApp.use('/api/products' , productRouter)

// Socket products
routerApp.use('/api/realtimeproducts' , midSession , realTimeProducts)

// Views de usuario 1
routerApp.use('/api/users' , midSession , userRouter)

// Views de socket
routerApp.use('/views/socket' , viewSocket)

// Views de Cart
routerApp.use('/api/carts' , midSession , cartRouter)

// Views de Order
routerApp.use('/api/orders', midSession , ordersRouter)

// View de Mail
routerApp.use('/api/mail' , mailRouter)

// View de SMS
routerApp.use('/api/sms' , midSession , smsRouter)

// View de MockingProducts
routerApp.use('/api/mockingproducts' , midSession , mockingRouter)

// View de logger
routerApp.use('/api/loggerTest' , loggerRouter)

// DOCUMENTACIÓN
routerApp.use('/api/docs' , swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

routerApp.use(( err , req , res , next ) => {
    console.log(err);
    res.status(500).send('Hubo un error en la ruta.')
})

module.exports = {
    routerApp
}