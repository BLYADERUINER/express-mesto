const express = require('express');

const { infoUpdateValid, avatarUpdateValid, idValid } = require('../middlewares/validate');
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
userRouter.get('/:userId', idValid, getUserOnId);
userRouter.patch('/me', infoUpdateValid, updateUserInfo);
userRouter.patch('/me/avatar', avatarUpdateValid, updateUserAvatar);

module.exports = userRouter;
