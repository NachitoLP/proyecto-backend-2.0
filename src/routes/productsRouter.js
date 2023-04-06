const { Router } = require('express')
const { ProductManager } = require("../managers/productManager");


const productRouter = Router();
const productManager = new ProductManager();


productRouter.get('/', async ( req , res ) => {
    const {limit} = req.query;
    let products = await productManager.getProducts()
    let productsArray = products.map((product) => product)
    
    if (!limit) {
        return res.render('products_no_limit' , {productsArray})
    }
    let productsArrayLimit = products.slice(0,limit)
    res.render('products_limit' , {productsArrayLimit})
})

productRouter.get('/:productID', async ( req , res ) => {
    const { productID } = req.params
    let productFound = await productManager.getProductsById(productID)

    res.render('product_id' , {productFound})
})

productRouter.delete('/:productID', async ( req , res ) => {
    const { productID } = req.params
    
    if (!productID) {
        return res.status(400).send("Envie el ID del producto a eliminar.")
    }
    
    let deleteProduct = await productManager.deleteProductById(productID)
    
    return res.send(deleteProduct)
})


module.exports = {
    productRouter
}