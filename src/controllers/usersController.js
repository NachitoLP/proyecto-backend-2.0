const { UserManagerMongo } = require("../dao/userManagerMongo");
let userManager = new UserManagerMongo()


class UserManagerController {
    getUsers = async ( req , res ) => {
        try {
            const {limit,page=1} = req.query;
            let {docs , hasPrevPage, hasNextPage, prevPage, nextPage} = await userManager.getUsers(limit,page)
            let userRol = (req.session.user.rol === "admin")
    
            return res.status(201).render('users', {
                rol:userRol,
                users: docs, 
                hasPrevPage, 
                hasNextPage, 
                prevPage, 
                nextPage
            })
        } 
        catch (error) {
            error
        }
    }

    getUserByName = async ( req , res ) => {
        try {
            const {name} = req.params
            const {limit,page=1} = req.query;
            let {docs , hasPrevPage, hasNextPage, prevPage, nextPage} = await userManager.getUserByName(name , limit , page)
    
            if(docs.length === 0) {
                return res.status(404).send("User not found.")
            }
    
            return res.status(201).render('users', {
                users: docs, 
                hasPrevPage, 
                hasNextPage, 
                prevPage, 
                nextPage
            })
        } 
        catch (error) {
            console.log(error);
        }
    }

    createUser = async ( req , res ) => {
        try {
            const { first_name , last_name , gender , email } = req.body
    
            let newUser = { first_name , last_name , gender , email }
            userManager.addUser( newUser )
    
            return res.json({
                message: 'Usuario creado.',
                usersArray
            })
        } 
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserManagerController