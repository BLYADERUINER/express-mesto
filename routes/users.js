const express = require('express');
const { getUsers, getUserOnId, createUser } = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUserOnId);
userRouter.post('/users', createUser);

module.exports = userRouter;
