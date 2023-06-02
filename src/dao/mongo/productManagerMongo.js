const { productsModel } = require("./models/productsModel")


class ProductManagerMongo{
    getProducts = async (limit,page) => {
        return await productsModel.paginate({status:true},{limit:limit||10, page:page||1, lean:true})
    }

    getProductById = async ( prodID ) => {
        let product = await productsModel.find({_id:prodID})
        if(product.length == 0) {
            return console.log("No existe el producto.");
        }
        return product
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