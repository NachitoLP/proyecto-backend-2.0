const { Router } = require('express');
const { usersArray } = require('../userRouter');
const viewsUser = Router();


viewsUser.get('/', ( req , res ) => {
    const randomUser = Math.floor(Math.random()*usersArray.length)
    
    res.render('index', {
        name: usersArray[randomUser].name,
        surname: usersArray[randomUser].surname,
        gender: usersArray[randomUser].gender,
        isAdmin: usersArray[randomUser].role === "admin",
        usersArray
    })
}) 

viewsUser.get('/register', ( req , res ) => {
    res.render('register')
})

module.exports = {
    viewsUser
}