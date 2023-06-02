const { Router } = require('express')
const productRouter = Router();

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

    .get('/:prodID', getProductByID)

    .post('/' , addProduct)

    .put('/:name' , updateProduct)

    .delete('/:name', deleteProduct)


module.exports = {
    productRouter
}