const {Router} = require('express')
const { userModel } = require('../../dao/models/usersModel')
const { createHashedPass } = require('../../utils/bcryptPass')
const passport = require('passport')

const sessionRouter = Router()

sessionRouter.get('/register' , ( req , res ) => {
    res.render('register')
})

sessionRouter.post('/register' , passport.authenticate('register', {failureRedirect:'/session/failedregister'}) , async ( req , res ) => {
    res.redirect('/home')
})

sessionRouter.get('/failedregister' , ( req , res ) => {
    let result = {
        status: "Error.",
        message: "El usuario ya existe."
    }
    res.status(401).send(result)
})

sessionRouter.get('/login' , ( req , res ) => {
    res.render('login')
})

sessionRouter.post('/login' , passport.authenticate('login', {failureRedirect:'/session/failedlogin'}), async ( req , res ) => {
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
})

sessionRouter.get('/failedlogin' , ( req , res ) => {
    let result = {
        status: "Error.",
        message: "El usuario no existe."
    }
    res.status(401).send(result)
})

sessionRouter.get('/github' , passport.authenticate('github'))

sessionRouter.get('/githubcallback' , passport.authenticate('github', {failureRedirect:'/session/failedlogin'}) , async ( req , res ) => {
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
})

sessionRouter.get('/recovery-password' , ( req , res ) => {
    res.render('new_login')
})

sessionRouter.post('/recovery-password' , async ( req , res ) => {
    const {email , newPassword} = req.body

    const user = await userModel.findOne({email})
    if (!user) return res.send({status: 'error', message: 'No hay ninguna cuenta registrada con ese correo.'})

    const hashedPassword = createHashedPass(newPassword)

    let result = await userModel.updateOne({email},{password:hashedPassword})

    req.session.user = {
        username: user.username,
        email: user.email,
        rol: user.rol
    }
    res.redirect('/home')
})

sessionRouter.get('/logout', ( req , res ) => {
    req.session.destroy (err => {
        if(err) return res.status(400).send({status: 'Logout error', message: err});
        res.redirect('/session/login')
    })
})



module.exports = {
    sessionRouter
}