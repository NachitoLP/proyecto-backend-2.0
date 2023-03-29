const { Router } = require('express');
const { ProductManager } = require('../../managers/productManager');
const { uploaders } = require('../../utils/multer')

const realTimeProducts = Router();
let productManager = new ProductManager()

realTimeProducts.get('/' , async ( req , res ) => {
    let products = await productManager.getProducts()
    let productsArray = products.map((product) => product)
    res.render('realtime' , {productsArray})
})

realTimeProducts.post('/', uploaders.single('file'), async ( req , res ) => {
    const { name , description , price , href , code , stock, status = true } = req.body
    if (!name || !description || !price || !code || !stock) return res.send("No se completaron todos los datos del producto.")

    let newProduct = {name , description , price , href , code , stock , status}

    let productsArray = await productManager.addProduct(newProduct)

    res.render('realtime' , {productsArray})
})

module.exports = {
    realTimeProducts
}