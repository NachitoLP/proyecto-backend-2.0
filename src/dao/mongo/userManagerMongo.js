const { userModel } = require("./models/usersModel")


class UserManagerMongo{
    get = async (limit,page) => {
        return await userModel.paginate({},{limit:limit||12, page:page, lean:true})
    }
    
    getByName = async ( first_name , limit , page ) => {
        return await userModel.paginate({first_name: first_name},{limit:limit||12, page:page, lean:true})
    }

    getByUsername = async ( username ) => {
        return await userModel.findOne({username:username})
    }

    create = async ( newUser ) => {
        return await userModel.create(newUser)
    }

    update = async ( data ) => {
        return await userModel.updateOne({username: data.username}, data)
    }

    delete = async ( username ) => {
        return await userModel.deleteOne({username:username})
    }
}

module.exports = {
    UserManagerMongo
}