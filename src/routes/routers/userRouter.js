const { Router } = require('express');
const { authSession } = require('../../middleware/authMiddleware');
const UserManagerController = require('../../controllers/usersController');
const userRouter = Router();

const {
    getUsers,
    getUserByName,
    createUser
} = new UserManagerController()

userRouter
    .get('/', authSession , getUsers)

    .get('/:first_name', getUserByName)

    .post('/' , createUser)

module.exports = {
    userRouter
}