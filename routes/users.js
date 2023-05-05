const userRouter = require('express').Router();

const { infoUpdateValid, avatarUpdateValid, idValid } = require('../middlewares/validate');
const {
  getUsers,
  getUserOnId,
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:_id', idValid, getUserOnId);
userRouter.patch('/me', infoUpdateValid, updateUserInfo);
userRouter.patch('/me/avatar', avatarUpdateValid, updateUserAvatar);

module.exports = userRouter;
