const { Router } = require('express')
const productRouter = Router();

const ProductManagerController = require('../../controllers/productsController');
const authRol = require('../../middleware/authRol');
const { midSession } = require('../../middleware/sessionMiddleware');

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

    .post('/' , midSession , authRol("admin") || authRol("premium") , addProduct)

    .put('/change/:name' , midSession , authRol("admin") || authRol("premium") , updateProduct)

    .delete('/delete/:name' , midSession , authRol("admin") || authRol("premium") , deleteProduct)


module.exports = {
    productRouter
}