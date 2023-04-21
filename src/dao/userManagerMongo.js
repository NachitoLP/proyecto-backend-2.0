const { userModel } = require("./models/usersModel")


class UserManagerMongo{
    getUsers = async (limit,page) => {
        return await userModel.paginate({},{limit:limit||12, page:page, lean:true})
    }
    
    getUserByName = async ( name , limit , page ) => {
        return await userModel.paginate({first_name: name},{limit:limit||12, page:page, lean:true})
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