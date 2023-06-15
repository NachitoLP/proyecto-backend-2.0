const {Router} = require('express')
const { generateProducts } = require('../../utils/faker')
const { faker } = require('@faker-js/faker')
const CustomError = require('../../utils/errors/CustomError')
const { generateProductErrorInfo1, generateProductErrorInfo2 } = require('../../utils/errors/info')
const EErrors = require('../../utils/errors/EErrors')

faker.locale = 'es'

const mockingRouter = Router()

let products = []

mockingRouter.get('/' , async ( req , res ) => {
    try {
        for(let i = 0; i < 100; i++) {
            products.push(generateProducts())
        }
        res.render('fakerProducts' , {products})
    } catch (error) {
        console.log(error);
    }
})

mockingRouter.post('/' , async ( req , res ) => {
    try {
        const { 
            title, 
            price, 
            description, 
            stock, 
            department, 
            code = faker.random.alphaNumeric(5),
            status = true
        } = req.body

        if (!title || !price || !description || !stock || !department) {
            CustomError.createError({
                name: "Product creation error.",
                cause: generateProductErrorInfo1({title, price, description, stock, department}),
                message: "Error trying to create a product.",
                code: EErrors.MISSING_DATA
            })
        }
        if (typeof(title) != String || typeof(price) != Number || typeof(description) != String || typeof(stock) != Number || typeof(department) != String) {
            CustomError.createError({
                name: "Product creation error.",
                cause: generateProductErrorInfo2({title, price, description, stock, department}),
                message: "Error trying to create a product.",
                code: EErrors.INVALID_TYPE_ERROR
            })
        }
        let product = { 
            title, 
            price, 
            description, 
            stock, 
            department, 
            code,
            status,
        }
        products.push(product)

        return res.status(200).send({
            status: 'Success',
            Message: 'Producto creado.'
        })

    } catch (error) {
        console.log(error);
    }
})

module.exports = mockingRouter