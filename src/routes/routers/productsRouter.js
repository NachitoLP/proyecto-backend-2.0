const { Router } = require('express')
const productRouter = Router();
const productRouterAdmin = Router();

const ProductManagerController = require('../../controllers/productsController');

const {
    getProducts,
    getProductByID,
    addProduct,
    updateProduct,
    deleteProduct
} = new ProductManagerController()

productRouter
    .get('/', getProducts)

    .get('/id/:prodID', getProductByID)

productRouterAdmin
    .get('/', getProducts)

    .get('/id/:prodID', getProductByID)

    .post('/' , addProduct)

    .put('/name/:name' , updateProduct)

    .delete('/name/:name', deleteProduct)


module.exports = {
    productRouter,
    productRouterAdmin
}