const { ProductsDao } = require("../dao/factory");
const productManager = new ProductsDao();

class ProductManagerController {
    getProducts = async ( req , res ) => {
        try {
            const {limit , page} = req.query;
            let {docs , hasPrevPage, hasNextPage, prevPage, nextPage} = await productManager.get(limit , page)
    
            if (!docs) {
                return res.status(400).send('No hay productos')
            }
            let user = req.session.user
            
            return res.render('products' , {
                products:docs, 
                hasPrevPage, 
                hasNextPage, 
                prevPage, 
                nextPage,
                user
            })
        } 
        catch (error) {
            console.log(error);
        }
    }

    getProductByID = async ( req , res) => {
        try {
            const {prodID} = req.params
            let product = await productManager.getById(prodID)
            return res.status(200).render('product_id' , {product})
        } catch (error) {
            console.log(error);
        }
    }

    addProduct = async ( req , res ) => {
        try {
            const { name , description , price , stock , code } = req.body
    
            if (!name || !description || !price || !stock || !code) {
                return res.status(400).send("No se completaron todos los campos.")
            }
    
            const newProduct = { name , description , price , stock , code , status: true }
            let result = await productManager.create(newProduct)
    
            return res.status(201).send({
                product: result,
                message: 'Success'
            })
        } 
        catch (error) {
            console.log(error);
        }
    }

    updateProduct = async ( req , res ) => {
        try {
            const { pid } = req.params
            let product = req.body
        
            if(!product.description || !product.price || !product.stock || !product.code) {
                return res.status(400).send("No se han completado todos los campos.")
            }
    
            let result = await productManager.update( pid , product )
    
            return res.status(201).send({
                products: result,
                message: 'Success change'
            })
        } 
        catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async ( req , res ) => {
        try {
            const { pid } = req.params
        
            let deleteProduct = await productManager.delete(pid)
            
            return res.status(200).send({message: 'Producto borrado', deleteProduct})
        } 
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = ProductManagerController