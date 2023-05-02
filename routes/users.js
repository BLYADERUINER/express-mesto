const express = require('express');
const {
  getUsers,
  getUserOnId,
  getCurrentUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.post('/', createUser);
userRouter.get('/:userId', getUserOnId);
userRouter.patch('/me', updateUserInfo);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;
