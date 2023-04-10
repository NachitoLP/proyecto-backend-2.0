const cookieParser = require('cookie-parser')
const {Router} = require('express')

const { viewsUser } = require('./routerViews/viewUser');
const { userRouter } = require('./routers/userRouter');
const { cartRouter } = require('./routers/cartRouter');
const { viewSocket } = require('./routerViews/viewSocket');
const { realTimeProducts } = require('./routerViews/viewRealProducts');
const { productRouter } = require('./routers/productsRouter');

const routerApp = Router()

// Middle y manejo de errores
routerApp.use(cookieParser())

// Views de products 
routerApp.use('/home' , productRouter)

// Socket products
routerApp.use('/realtimeproducts' , realTimeProducts)

// Views de usuario 1
routerApp.use('/api/users' , userRouter)

// Views de usuario 2
routerApp.use('/views/user' , viewsUser)

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