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
    createUser,
    deleteAllInactive,
    deleteUser
} = new UserManagerController()

userRouter
    .get('/', authRol("admin") , getUsers)

    .get('/userByName/:first_name' , authRol("admin") , getUserByName)

    .get('/premium/:username' , changeRol)

    .post('/' , authRol("admin") ,createUser)

    .get('/delete-inactive' , authRol("admin") , deleteAllInactive)

    .get('/delete/:username' , authRol("admin") , deleteUser)

module.exports = {
    userRouter
}