const { orderModel } = require("./models/ordersModel");

class OrderManagerMongo {
    get = async () => {
        return await orderModel.find({})
    }

    getById = async (id) => {
        return await orderModel.findById({_id: id})
    }

    create = async (newOrder) => {
        return await orderModel.create(newOrder)
    }

    update = async (id , order) => {
        return await orderModel.findByIdAndUpdate({_id: id} , {order})
    }

    delete = async (id) => {
        return await orderModel.delete({_id: id})
    }
}

module.exports = {
    OrderManagerMongo
}