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

productRouter.get('/', getProducts)

productRouter.get('/:prodID', getProductByID)

productRouter.post('/' , addProduct)

productRouter.put('/:name' , updateProduct)

productRouter.delete('/:name', deleteProduct)


module.exports = {
    productRouter
}