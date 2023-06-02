const {Router} = require("express")

const cookieRouter = Router()

cookieRouter
    .get('/' , ( req , res ) => {
        console.log(req.signedCookies)
        res.render('cookiesForm')
    })

    .post('/' , ( req , res ) => {
        const { name, email } = req.body
        res.cookie('CoderCookie' , `name: ${name}, email:${email}` , {maxAge: 10000 , signed: true}).render('cookiesForm')
    })

    .get('/delete' , ( req , res ) => {
        res.clearCookie('CoderCookie').send('Cookie removed.')
    })


module.exports = {
    cookieRouter
}