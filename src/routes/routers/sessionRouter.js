const {Router} = require('express')
const { userModel } = require('../../dao/models/usersModel')

const sessionRouter = Router()

sessionRouter.get('/register' , ( req , res ) => {
    res.render('register')
})

sessionRouter.post('/register' , async ( req , res ) => {
    try {
        const {first_name,last_name,email,password,username} = req.body

        const exist = await userModel.findOne({email})

        if(exist) return res.send({status: 'error', message: 'El usuario ya existe.'})
        const newUser = {
            first_name,
            username,
            last_name,
            email,
            password,
            rol:'usuario'
        }
        if (email === 'adminCoder@coder.com' && password == 'adminCod3r123') {
            newUser.rol = 'admin'
        }
        
        let result = await userModel.create(newUser)
        res.redirect('/session/login')
    } 
    catch (error) {
        console.log(error);
    }
})

sessionRouter.get('/login' , ( req , res ) => {
    res.render('login')
})

sessionRouter.post('/login' , async ( req , res ) => {
    try {
        const { username , password } = req.body

        const user = await userModel.findOne({username,password})
        
        if (!user) return res.send({status: 'error', message: 'Revisá el usuario y la contraseña'})

        req.session.user = {
            username: user.username,
            password: user.password
        }

        res.redirect('/home')
    } catch (error) {
        console.log(error);
    }
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