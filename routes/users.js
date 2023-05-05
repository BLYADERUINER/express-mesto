const express = require('express');

const { infoUpdateValid, avatarUpdateValid } = require('../middlewares/validate');
const {
  getUsers,
  getUserOnId,
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', getUserOnId);
userRouter.patch('/me', infoUpdateValid, updateUserInfo);
userRouter.patch('/me/avatar', avatarUpdateValid, updateUserAvatar);

module.exports = userRouter;
