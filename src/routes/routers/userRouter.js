const { Router } = require('express');
const { authSession } = require('../../middleware/authMiddleware');
const UserManagerController = require('../../controllers/usersController');
const authRol = require('../../middleware/authRol');
const { profileMulter } = require('../../utils/multer');
const userRouter = Router();

const {
    getUsers,
    getUserByName,
    changeRol,
    createUser
} = new UserManagerController()

userRouter
    .get('/', authRol("admin") , getUsers)

    .get('/:first_name' , authRol("admin") , getUserByName)

    .get('/premium/:uid' , changeRol)

    .post('/' , createUser)

    .get('/a/documents' , async ( req , res ) => {
        res.render('uploadFiles')
    })

    .post('/a/documents' , profileMulter.single('profile_picture') , async ( req , res ) => {
        res.send("Se ha subido el archivo.")
    })

module.exports = {
    userRouter
}