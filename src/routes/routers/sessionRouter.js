const {Router} = require('express')
const passport = require('passport')
const sessionManagerController = require('../../controllers/sessionController')

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


sessionRouter.get('/register' , ( req , res ) => {
    res.render('register')
})

sessionRouter.post('/register' , passport.authenticate('register', {failureRedirect:'/session/failedregister'}) , async ( req , res ) => {
    res.redirect('/home')
})


sessionRouter.get('/login' , ( req , res ) => {
    res.render('login')
})

sessionRouter.post('/login' , passport.authenticate('login', {failureRedirect:'/session/failedlogin'}), loginFunction)

sessionRouter.get('/failedregister' , failedRegister)

sessionRouter.get('/failedlogin' , failedLogin)

sessionRouter.get('/github' , passport.authenticate('github'))

sessionRouter.get('/githubcallback' , passport.authenticate('github', {failureRedirect:'/session/failedlogin'}) , githubCallback)

sessionRouter.get('/recovery-password' , ( req , res ) => {
    res.render('new_login')
})

sessionRouter.post('/recovery-password' , recoveryPassword)

sessionRouter.get('/current' , currentSession)

sessionRouter.get('/logout', logoutSession)


module.exports = {
    sessionRouter
}