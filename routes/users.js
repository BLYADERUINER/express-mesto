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
userRouter.post('/', createUser);
userRouter.get('/:userId', getCurrentUser);
userRouter.get('/me', getUserOnId);
userRouter.patch('/me', updateUserInfo);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;
