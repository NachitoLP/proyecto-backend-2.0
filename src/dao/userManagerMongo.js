const { userModel } = require("./models/usersModel")


class UserManagerMongo{
    getUsers = async () => {
        return await userModel.find()
    }
    
    getUserByName = async ( name ) => {
        return await userModel.find({first_name: name})
    }

    addUser = async ( newUser ) => {
        return await userModel.create(newUser)
    }

    updateUser = async ( name , data ) => {
        return await userModel.updateOne({first_name:name}, {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            gender: data.gender
        })
    }

    deleteUser = async ( name ) => {
        return await userModel.deleteOne({first_name:name})
    }
}

module.exports = {
    UserManagerMongo
}