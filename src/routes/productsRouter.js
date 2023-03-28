const { Router } = require('express')
const { uploaders } = require('../utils/multer');
const { ProductManager } = require("../managers/productManager");


const productRouter = Router();
const productManager = new ProductManager();


productRouter.get('/', async ( req , res ) => {
    const {limit} = req.query;
    let products = await productManager.getProducts()
    
    if (!limit) {
        return res.send(products)
    }

    res.send(products.slice(0,limit))
})

productRouter.get('/:productID', async ( req , res ) => {
    const { productID } = req.params
    let productFound = await productManager.getProductsById(productID)

    res.send(productFound)
})

productRouter.post('/', uploaders.single('file'), async ( req , res ) => {
    const { name , description , price , href , code , stock, status = true } = req.body
    if (!name || !description || !price || !code || !stock) return res.send("No se completaron todos los datos del producto.")

    let newProduct = {name , description , price , href , code , stock , status}

    let newArray = await productManager.addProduct(newProduct)

    return res.send(newArray)
})

/* productRouter.put('/:prodID', async ( req , res ) => {
    const { prodID } = req.params
    let products = await productManager.getProducts()
    const { price } = req.body

    let productIndex = products.findIndex((product) => product.id.toString() === prodID)
    products[productIndex].price = price


    res.status(200).send({
        status:"success",
        products
    })
}) */

productRouter.delete('/:productID', async ( req , res ) => {
    const { productID } = req.params
    
    if (!productID) {
        return res.status(400).send("Envie el ID del producto a eliminar.")
    }
    
    let deleteProduct = await productManager.deleteProductsById(productID)
    
    return res.send(deleteProduct)
})


module.exports = {
    productRouter
}