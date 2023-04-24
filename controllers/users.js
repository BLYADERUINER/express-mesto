const mongoose = require('mongoose');

const { CastError, ValidationError } = mongoose.Error;
const User = require('../models/user');
const {
  RESPONSE_OK,
  RESPONSE_CREATED,
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
  responseMessage,
} = require('../utils/statuscode');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => responseMessage(res, RESPONSE_OK, { data: users }))
    .catch(() => responseMessage(res, ERROR_DEFAULT, { message: 'Произошла ошибка при получении пользователей' }));
};

const getUserOnId = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      throw new Error('ErrorId');
    })
    .then((user) => responseMessage(res, RESPONSE_OK, { data: user }))
    .catch((err) => {
      if (err instanceof CastError) {
        responseMessage(res, ERROR_BAD_REQUEST, { message: 'Произошла ошибка: некорректный запрос' });
      } else if (err.message === 'ErrorId') {
        responseMessage(res, ERROR_NOT_FOUND, { message: 'Произошла ошибка: пользователь не найден' });
      } else {
        responseMessage(res, ERROR_DEFAULT, { message: 'Произошла ошибка при получении пользователя' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => responseMessage(res, RESPONSE_CREATED, { data: user }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        responseMessage(res, ERROR_BAD_REQUEST, { message: 'Произошла ошибка: введены некорректные данные' });
      } else {
        responseMessage(res, ERROR_DEFAULT, { message: 'Произошла ошибка при создании пользователя' });
      }
    });
};

const updateUserInfo = (req, res) => {
  const owner = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(owner, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new Error('ErrorId');
    })
    .then((userInfo) => responseMessage(res, RESPONSE_OK, { data: userInfo }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        responseMessage(res, ERROR_BAD_REQUEST, { message: 'Произошла ошибка: некорректный запрос' });
      } else if (err.message === 'ErrorId') {
        responseMessage(res, ERROR_NOT_FOUND, { message: 'Произошла ошибка: пользователь с указанным id не найден' });
      } else {
        responseMessage(res, ERROR_DEFAULT, { message: 'Произошла ошибка при обновлении профиля' });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const owner = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(owner, { avatar }, { new: true })
    .orFail(() => {
      throw new Error('ErrorId');
    })
    .then((userInfo) => responseMessage(res, RESPONSE_OK, { data: userInfo }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        responseMessage(res, ERROR_BAD_REQUEST, { message: 'Произошла ошибка: некорректный запрос' });
      } else if (err.message === 'ErrorId') {
        responseMessage(res, ERROR_NOT_FOUND, { message: 'Произошла ошибка: пользователь с указанным id не найден' });
      } else {
        responseMessage(res, ERROR_DEFAULT, { message: 'Произошла ошибка при обновлении аварки профиля' });
      }
    });
};

module.exports = {
  getUsers,
  getUserOnId,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
