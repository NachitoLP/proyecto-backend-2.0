const { productService } = require("../service");
const { logger } = require("../utils/logger");
const { sendDeleteProductMail } = require("../utils/nodemailer");


class ProductManagerController {
    getProducts = async ( req , res ) => {
        try {
            const {limit , page} = req.query;
            let {docs , hasPrevPage, hasNextPage, prevPage, nextPage} = await productService.get(limit , page)
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
            logger.error(error);
        }
    }

    getProductByID = async ( req , res) => {
        try {
            const {prodID} = req.params
            let product = await productService.getById(prodID)
            return res.status(200).render('product_id' , {product})
        } catch (error) {
            logger.error(error);
        }
    }

    addProduct = async ( req , res ) => {
        try {
            const { title , description , price , stock , code } = req.body
    
            if (!title || !description || !price || !stock || !code) {
                return res.status(400).send("No se completaron todos los campos.")
            }
    
            
            const newProduct = { title , description , price , stock , code , owner: "admin", status: true }

            if(req.session.user.rol == "premium") {
                newProduct.owner = req.session.user.email
            }

            let result = await productService.create(newProduct)
    
            return res.status(201).send({
                product: result,
                message: 'Success'
            })
        } 
        catch (error) {
            logger.error(error);
            console.log(error)
        }
    }

    updateProduct = async ( req , res ) => {
        try {
            const { pid } = req.params
            let product = req.body

            if(req.session.user.rol == "premium") {
                if(product.owner == req.session.user.email) {
                    if(!product.description || !product.price || !product.stock || !product.code) {
                        return res.status(400).send("No se han completado todos los campos.")
                    }
                    let productUpdated = await productService.update(pid , product)
                    return res.status(200).send({message: 'Producto actualizado.', productUpdated})
                }
                else{
                    return res.status(401).send({status: 'error', message: "No puedes actualizar un producto que no es tuyo."})
                }
            }

            if(!product.description || !product.price || !product.stock || !product.code) {
                return res.status(400).send("No se han completado todos los campos.")
            }

            let result = await productService.update( pid , product )

            return res.status(201).send({
                products: result,
                message: 'Success change'
            })
        } 
        catch (error) {
            logger.error(error);
        }
    }

    deleteProduct = async ( req , res ) => {
        try {
            const { pid } = req.params
            
            let product = await productService.getById(pid)
            
            if(req.session.user.rol == "premium") {
                if(product.owner == req.session.user.email) {
                    let deleteProduct = await productService.delete(pid)
                    await sendDeleteProductMail(product.owner, product.title)
                    
                    return res.status(200).send({message: 'Producto borrado', deleteProduct})
                }
                else{
                    return res.status(401).send({status: 'error', message: "No puedes eliminar un producto que no es tuyo."})
                }
            }

            if (product.owner != "admin") {
                await sendDeleteProductMail(product.owner, product.title)
            }
            let deleteProduct = await productService.delete(pid)
            
            return res.status(200).send({message: 'Producto borrado', deleteProduct})
        } 
        catch (error) {
            logger.error(error);
        }
    }
}

module.exports = ProductManagerController