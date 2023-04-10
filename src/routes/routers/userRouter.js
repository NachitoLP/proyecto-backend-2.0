const { Router } = require('express');
const userRouter = Router();

const usersArray = [
    { id: 1, name: "Joaquin", surname: "Lopez", gender: "M" , email: "joaquin@gmail.com" ,  role: "admin" },
    { id: 2, name: "Carlos", surname: "Gomez", gender: "M" , email: "carlos@gmail.com" , role: "user" },
    { id: 3, name: "Fernanda", surname: "Perez", gender: "F" , email: "fernanda@gmail.com" , role: "user" },
    { id: 4, name: "Carla", surname: "Diaz", gender: "F" , email: "carla@gmail.com" , role: "user" },
    { id: 5, name: "Marcelo", surname: "Lopez", gender: "M" , email: "marcelo@gmail.com" , role: "admin" }
]


userRouter.get('/', ( req , res ) => {
    const {limit} = req.query;
    
    if (!limit) {
        return res.send(usersArray)
    }
    const usersNewArray = usersArray
    res.send(usersNewArray.slice(0,limit))
})

userRouter.post('/' , ( req , res ) => {
    const { name , surname , gender , email } = req.body
    let id = 0

    if (usersArray.length === 0) {
        id = 1;
    }
    else {
        id = usersArray[usersArray.length-1].id + 1;
    }

    usersArray.push( { id , name , surname , gender , email , role: "user" } )
    return res.json({
        message: 'Usuario creado.',
        usersArray
    })
})

module.exports = {
    userRouter,
    usersArray
}