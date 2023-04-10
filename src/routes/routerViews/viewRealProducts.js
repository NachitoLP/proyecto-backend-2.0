const { Router } = require('express');
const { ProductManager } = require('../../managers/fs/productManager');

const realTimeProducts = Router();
let productManager = new ProductManager()

realTimeProducts.get('/' , async ( req , res ) => {
    let products = await productManager.getProducts()
    let productsArray = products.map((product) => product)
    res.render('realtime' , {productsArray})
})

module.exports = {
    realTimeProducts
}