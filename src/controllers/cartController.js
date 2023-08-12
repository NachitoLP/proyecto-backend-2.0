const { cartModel } = require("../dao/mongo/models/cartsModel");
const { orderModel } = require("../dao/mongo/models/ordersModel");
const { productsModel } = require("../dao/mongo/models/productsModel");
const { userModel } = require("../dao/mongo/models/usersModel");
const { cartService, userService, orderService, productService } = require("../service");
const { logger } = require("../utils/logger");
const { sendMailTransport } = require("../utils/nodemailer");


class CartManagerController {
    getCarts = async ( req , res ) => {
        try {
            const {limit,page} = req.query;
            const {docs, hasPrevPage, hasNextPage, prevPage, nextPage} = await cartService.get(limit,page)
    
            if (!docs) {
                return res.status(400).send('No hay productos')
            }
            
            return res.status(200).render('carts', {
                newCart:docs, 
                hasPrevPage, 
                hasNextPage, 
                prevPage, 
                nextPage
            })
        } 
        catch (error) {
            logger.error(error);
        }
    }

    getCartByID = async ( req , res ) => {
        try {
            const username = req.session.user.username
            const user = await userService.getByUsername(username)

            let cart_id = user.cart_id

            const newCart = await cartService.getById(cart_id , username)

            const newCart2 = await cartModel.findOne({_id:cart_id})

            let noProducts = false

            if (newCart2) {
                if(newCart2.products.length < 1) {
                    noProducts = true
                }
            }

            return res.status(200).render('carts', {newCart,noProducts})
        } 
        catch (error) {
            logger.error(error);
        }
    }

    createCart = async ( req , res ) => {
        try {
            let username = req.body.username

            const userInDB = await userService.getByUsername(username)
            let userID = userInDB._id

            if (userInDB.cart_id) {
                return res.status(401).send('Este usuario ya tiene un carrito asociado.')
            }

            const newCart = await cartService.create({products: []})

            let cartID = newCart._id

            userInDB.cart_id = cartID

            newCart.user.push({
                _id:userID
            })
            
            await userModel.findByIdAndUpdate({_id: userID}, userInDB)
            await cartModel.findByIdAndUpdate({_id: cartID}, newCart)

            res.redirect('/home')
        } 
        catch (error) {
            logger.error(error);
        }
    }

    addProductToCart = async ( req , res ) => {
        try {
            const { prodID } = req.params
            
            if(req.session.user.rol == "premium") {
                let product = await productService.getById(prodID)
                if(product.owner == req.session.user.email){
                    return res.status(401).send({status: 'error', message: 'No podes agregar al carrito un producto creado por vos.'})
                }
                else{
                    const username = req.session.user.username
                    let user = await userService.getByUsername(username)

                    let cartID = user.cart_id

                    await cartService.update( cartID , prodID )
                    res.redirect('/api/carts')
                }
            }

            const username = req.session.user.username
            let user = await userService.getByUsername(username)

            let cartID = user.cart_id

            await cartService.update( cartID , prodID )
            res.redirect('/api/carts')
        } 
        catch (error) {
            logger.error(error);
        }
    }

    deleteCart = async ( req , res ) => {
        try {
            const { cartID } = req.params
            const deleteCart = await cartService.delete( cartID )
            res.status(200).send({
                cart: deleteCart,
                message: "Carrito borrado."
            })
        } 
        catch (error) {
            logger.error(error);
        }
    }

    deleteProductInCart = async ( req , res ) => {
        try {
            let username = req.session.user.username
            let user = await userModel.findOne({username})
            let cartID = user.cart_id
            let {prodID} = req.params

            if (!cartID) {
                const { cartID , prodID } = req.params
                const deleteCart = await cartService.deleteInCart( cartID , prodID )
                return res.status(200).send({
                    cart: deleteCart,
                    message: "Producto borrado."
                })
            }

            await cartService.deleteInCart( cartID , prodID )
            /* return res.status(200).send({
                message: "Producto borrado."
            }) */
            return res.redirect('/api/carts')
        } 
        catch (error) {
            console.log(error);
            logger.error(error);
        }
    }

    purchaseCart = async ( req , res ) => {
        try {
            const username = req.session.user.username
            let user = await userService.getByUsername(username)

            let cartID = user.cart_id
            let cart = await cartModel.findOne({_id:cartID})

            let products = cart.products
            let total = 0

            let order = {
                user: [],
                products: [],
                total,
                purchase_datetime: Date().toString()
            }
            order.user.push({
                _id:user._id
            })

            let result = await orderService.create(order)

            let orderID = result._id
            
            products.forEach(async product => {

                let productDetail = await productsModel.findOne({_id:product._id})

                if (productDetail.stock < product.quantity) {
                    let productIndex = products.findIndex(product => product._id == productDetail._id)
                    products.splice(productIndex,1)

                    if (products.length == 0) {
                        await orderModel.findByIdAndDelete({_id:orderID})
                        return console.log(`La compra no se pudo realizar porque no hay stock de ${productDetail.name}`);;
                    }
                }
                else {
                    order.total += productDetail.price * product.quantity
                    order.products.push({
                        _id: productDetail._id,
                        quantity: product.quantity
                    })
                    
                    productDetail.stock - products.quantity // No funciona

                    if (productDetail.stock === 0) {
                        productDetail.status = false
                    }

                    await productsModel.findByIdAndUpdate({_id:productDetail._id},{productDetail})
                    
                    await orderModel.findByIdAndUpdate({_id:orderID}, order)

                    await cartModel.updateOne({_id:cartID},{$pull:{products:{_id:product._id}}})
                }
            });

            await sendMailTransport(user.email,orderID)

            return res.render('purchase')
        } catch (error) {
            logger.error(error);
        }
    }
}

module.exports = CartManagerController
