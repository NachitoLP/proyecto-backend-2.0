const { Router } = require('express');
const { UserManagerMongo } = require('../../dao/userManagerMongo');
const userRouter = Router();
let userManager = new UserManagerMongo()


userRouter.get('/', async ( req , res ) => {
    const {limit} = req.query;
    let users = await userManager.getUsers()
    if (!limit) {
        return res.status(201).send(users)
    }
    const usersNewArray = users
    res.status(201).send(usersNewArray.slice(0,limit))
})

userRouter.get('/:name', async ( req , res ) => {
    const {name} = req.params
    let userFound = await userManager.getUserByName(name)

    if(userFound.length === 0) {
        return res.status(404).send("User not found.")
    }

    return res.status(201).send(userFound)
})

userRouter.post('/' , async ( req , res ) => {
    const { first_name , last_name , gender , email } = req.body

    let newUser = { first_name , last_name , gender , email }
    userManager.addUser( newUser )

    return res.json({
        message: 'Usuario creado.',
        usersArray
    })
})

module.exports = {
    userRouter
}