const { Router } = require('express');
const { authSession } = require('../../middleware/authMiddleware');
const UserManagerController = require('../../controllers/usersController');
const authRol = require('../../middleware/authRol');
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

module.exports = {
    userRouter
}