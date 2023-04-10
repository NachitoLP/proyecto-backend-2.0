const { productsModel } = require("../models/productsModel")


class ProductManagerMongo{
    getProducts = async () => {
        return await productsModel.find({status:true})
    }

    addProduct = async (newProduct) => {
        return await productsModel.create(newProduct)
    }

    updateProductByName = async ( name , product ) => {
        return await productsModel.updateOne({name:name}, {
            price: product.price,
            description: product.description,
            code: product.code,
            stock: product.stock,
            href: product.href||"Sin imagen"
        })
    }

    deleteProductByName = async ( name ) => {
        return await productsModel.updateOne({name:name},{status:false})
    }
}

module.exports = {
    ProductManagerMongo
}