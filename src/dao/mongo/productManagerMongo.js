const { productsModel } = require("./models/productsModel")


class ProductManagerMongo{
    get = async (limit,page) => {
        return await productsModel.paginate({status:true},{limit:limit||10, page:page||1, lean:true})
    }

    getById = async ( prodID ) => {
        let product = await productsModel.find({_id:prodID})
        if(product.length == 0) {
            return console.log("No existe el producto.");
        }
        return product
    }

    create = async (newProduct) => {
        return await productsModel.create(newProduct)
    }

    update = async ( id , product ) => {
        return await productsModel.findByIdAndUpdate({_id:id}, {product})
    }

    delete = async ( id ) => {
        return await productsModel.updateOne({_id:id},{status:false})
    }
}

module.exports = {
    ProductManagerMongo
}