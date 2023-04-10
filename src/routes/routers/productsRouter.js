const { Router } = require('express')
const { ProductManagerMongo } = require('../../managers/productManagerMongo');


const productRouter = Router();
const productManager = new ProductManagerMongo();


productRouter.get('/', async ( req , res ) => {
    try {
        const {limit} = req.query;
        let products = await productManager.getProducts()

        if (!products) {
            return res.status(400).send('No hay productos')
        }
        
        let productsArray = products.map((product) => product)
        if (!limit) {
            return res.render('products_no_limit' , {productsArray})
        }

        let productsArrayLimit = products.slice(0,limit)
        res.render('products_limit' , {productsArrayLimit})
    } 
    catch (error) {
        console.log(error);
    }
})

productRouter.post('/' , async ( req , res ) => {
    try {
        const { name , description , price , stock , code } = req.body

        if (!name || !description || !price || !stock || !code) {
            return res.status(400).send("No se completaron todos los campos.")
        }

        const newProduct = { name , description , price , stock , code , status: true }
        let result = await productManager.addProduct(newProduct)

        return res.status(201).send({
            product: result,
            message: 'Success'
        })
    } 
    catch (error) {
        console.log(error);
    }
})

productRouter.put('/:name' , async ( req , res ) => {
    try {
        const { name } = req.params
        let product = req.body
    
        if(!product.description || !product.price || !product.stock || !product.code) {
            return res.status(400).send("No se han completado todos los campos.")
        }

        let result = await productManager.updateProductByName( name , product )

        return res.status(201).send({
            products: result,
            message: 'Success change'
        })
    } 
    catch (error) {
        console.log(error);
    }
})

productRouter.delete('/:name', async ( req , res ) => {
    try {
        const { name } = req.params
    
        let deleteProduct = await productManager.deleteProductByName(name)
        
        return res.status(200).send({message: 'Producto borrado', deleteProduct})
    } 
    catch (error) {
        console.log(error);
    }
})


module.exports = {
    productRouter
}