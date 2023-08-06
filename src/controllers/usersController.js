const { userService } = require("../service");
const { logger } = require("../utils/logger");
const { sendDeleteAccountMail } = require("../utils/nodemailer");


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

    changeRol = async ( req , res ) => {
        try {
            if(req.session.user.rol == "premium"){
                let {username} = req.session.user
                let user = await userService.getByUsername(username)
                
                user.rol = "usuario"
                req.session.user.rol = "usuario"

                await userService.update(user)
                
                return res.status(201).send({status: 'success', message: `Rol cambiado correctamente. Ahora sos ${user.rol}.`})
            }
            else if(req.session.user.rol == "usuario") {
                let {username} = req.session.user
                let user = await userService.getByUsername(username)
                
                user.rol = "premium"
                req.session.user.rol = "premium"

                await userService.update(user)
                
                return res.status(201).send({status: 'success', message: `Rol cambiado correctamente. Ahora sos ${user.rol}.`})
            }
            else{
                const {username} = req.params
                let user = await userService.getByUsername(username)

                if(user.rol == "premium"){
                    user.rol = "usuario"
                }
                else{
                    user.rol = "premium"
                }
                
                await userService.update(user)
                return res.status(201).send({status: 'success', message: `Rol cambiado correctamente. Ahora el usuario es ${user.rol}.`})
            }
        } 
        catch (error) {
            console.log(error);
            logger.error(error)
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

    deleteAllInactive = async ( req , res ) => {
        try {
            let { docs } = await userService.get()
            let newDay = new Date()
            docs.forEach(async user => {
                let day = user.last_connection
                if(newDay.getDate() - day.getDate() > 2){
                    await userService.delete(user.username)
                    await sendDeleteAccountMail(user.email , user.full_name)
                }
            })
            res.status(200).send({
                status:"succesful",
                message:"Los usuarios con más de 2 días de inactividad han sido eliminados."
            })
        } 
        catch (error) {
            console.log(error)
        }
    }

    deleteUser = async ( req , res ) => {
        try {
            let {username} = req.params
            await userService.delete(username)
            return res.status(200).send({
                status:"succesful",
                message:"El usuario se ha eliminado con éxito."
            })
        } 
        catch (error) {
            console.log(error)
        }
    }
}

module.exports = UserManagerController