const { userModel } = require('../dao/mongo/models/usersModel')
const { createHashedPass } = require('../utils/bcryptPass')

class sessionManagerController {
    loginFunction = async ( req , res ) => {
        try {
            req.session.user = {
                username: req.user.username,
                email: req.user.email,
                rol: req.user.rol
            }
            
            res.redirect('/home')
        } catch (error) {
            console.log(error);
        }
    }

    failedRegister = ( req , res ) => {
        let result = {
            status: "Error.",
            message: "El usuario ya existe."
        }
        res.status(401).send(result)
    }

    failedLogin = ( req , res ) => {
        let result = {
            status: "Error.",
            message: "El usuario no existe."
        }
        res.status(401).send(result)
    }

    githubCallback = async ( req , res ) => {
        try {
            req.session.user = {
                username: req.user.username,
                email: req.user.email,
                rol: req.user.rol
            }
    
            res.redirect('/home')
        } catch (error) {
            console.log(error);
        }
    }

    recoveryPassword = async ( req , res ) => {
        const {email , newPassword} = req.body
    
        const user = await userModel.findOne({email})
        if (!user) return res.send({status: 'error', message: 'No hay ninguna cuenta registrada con ese correo.'})
    
        const hashedPassword = createHashedPass(newPassword)
    
        await userModel.updateOne({email},{password:hashedPassword})
    
        req.session.user = {
            username: user.username,
            email: user.email,
            rol: user.rol
        }
        res.redirect('/home')
    }

    currentSession = async ( req , res ) => {
        if (!req.session.user) {
            res.redirect('/session/login')
        }
        res.send(req.session.user)
    }

    logoutSession = ( req , res ) => {
        req.session.destroy (err => {
            if(err) return res.status(400).send({status: 'Logout error', message: err});
            res.redirect('/session/login')
        })
    }
}

module.exports = sessionManagerController