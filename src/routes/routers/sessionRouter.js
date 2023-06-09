const {Router} = require('express')
const passport = require('passport')
const sessionManagerController = require('../../controllers/sessionController')
const CartManagerController = require('../../controllers/cartController')

const sessionRouter = Router()
const {
    loginFunction,
    failedRegister,
    failedLogin,
    githubCallback,
    recoveryPassword,
    currentSession,
    logoutSession
} = new sessionManagerController()


const { createCart } = new CartManagerController()

sessionRouter
    .get('/register' , ( req , res ) => {
        res.render('register')
    })

    .post('/register' , passport.authenticate('register', {failureRedirect:'/session/failedregister'}) , createCart)

    .get('/login' , ( req , res ) => {
        res.render('login')
    })

    .post('/login' , passport.authenticate('login', {failureRedirect:'/session/failedlogin'}), loginFunction)

    .get('/failedregister' , failedRegister)

    .get('/failedlogin' , failedLogin)

    .get('/github' , passport.authenticate('github'))

    .get('/githubcallback' , passport.authenticate('github', {failureRedirect:'/session/failedlogin'}) , githubCallback)

    .get('/recovery-password' , ( req , res ) => {
        res.render('new_login')
    })

    .post('/recovery-password' , recoveryPassword)

    .get('/current' , currentSession)

    .get('/logout', logoutSession)


module.exports = {
    sessionRouter
}