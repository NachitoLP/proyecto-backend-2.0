const { Router } = require('express');
const { ProductManagerMongo } = require('../../dao/mongo/productManagerMongo');

const realTimeProducts = Router();
let productManager = new ProductManagerMongo()

realTimeProducts.get('/' , async ( req , res ) => {
    try {
        let {docs} = await productManager.getProducts()

        res.render('realtime' , {products:docs})
    } catch (error) {
        console.log(error);
    }
})

realTimeProducts.post('/' , async ( req , res ) => {
    try {
        const { name , description , price , stock , code } = req.body

        if (!name || !description || !price || !stock || !code) {
            return res.status(400).send("No se completaron todos los campos.")
        }

        const newProduct = { name , description , price , stock , code , status: true }
        await productManager.addProduct(newProduct)

        let products = await productManager.getProducts()
        return res.render('realtime' , {products})
    } 
    catch (error) {
        console.log(error);
    }
})

module.exports = {
    realTimeProducts
}