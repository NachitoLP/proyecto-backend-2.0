const { userService } = require("../service");
const { logger } = require("../utils/logger");


class UserManagerController {
    getUsers = async ( req , res ) => {
        try {
            const {limit,page=1} = req.query;
            let {docs , hasPrevPage, hasNextPage, prevPage, nextPage} = await userService.get(limit,page)
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
            logger.error(error);
        }
    }

    getUserByName = async ( req , res ) => {
        try {
            const {first_name} = req.params
            const {limit,page=1} = req.query;
            let {docs , hasPrevPage, hasNextPage, prevPage, nextPage} = await userService.getByName(first_name , limit , page)
    
            if(docs.length === 0) {
                return res.status(404).send("User not found.")
            }
            let userRol = (req.session.user.rol === "admin")
            return res.status(201).render('users', {
                users: docs, 
                hasPrevPage, 
                hasNextPage, 
                prevPage, 
                nextPage,
                rol: userRol
            })
        } 
        catch (error) {
            logger.error(error);
        }
    }

    createUser = async ( req , res ) => {
        try {
            const { first_name , last_name , gender , email } = req.body
    
            let newUser = { first_name , last_name , gender , email }
            userService.create( newUser )
    
            return res.json({
                message: 'Usuario creado.',
                usersArray
            })
        } 
        catch (error) {
            logger.error(error);
        }
    }
}

module.exports = UserManagerController