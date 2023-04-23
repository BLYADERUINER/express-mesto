const User = require('../models/user');
const {
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
  errorMessage,
} = require('../utils/error');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => errorMessage(res, ERROR_DEFAULT, 'Произошла ошибка при получении пользователей'));
};

const getUserOnId = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      throw new Error('ErrorId');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === 'ErrorId') {
        errorMessage(res, ERROR_NOT_FOUND, 'Произошла ошибка: пользователь не найден');
      } else {
        errorMessage(res, ERROR_DEFAULT, 'Произошла ошибка при получении пользователя');
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        errorMessage(res, ERROR_BAD_REQUEST, 'Произошла ошибка: введены некорректные данные');
      } else {
        errorMessage(res, ERROR_DEFAULT, 'Произошла ошибка при создании пользователя');
      }
    });
};

const updateUserInfo = (req, res) => {
  const owner = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(owner, { name, about })
    .orFail(() => {
      throw new Error('ErrorId');
    })
    .then((userInfo) => res.status(201).send({ data: userInfo }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        errorMessage(res, ERROR_BAD_REQUEST, 'Произошла ошибка: введены некорректные данные');
      } else if (err.message === 'ErrorId') {
        errorMessage(res, ERROR_NOT_FOUND, 'Произошла ошибка: пользователь с указанным id не найден');
      } else {
        errorMessage(res, ERROR_DEFAULT, 'Произошла ошибка при обновлении профиля');
      }
    });
};

const updateUserAvatar = (req, res) => {
  const owner = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(owner, { avatar })
    .orFail(() => {
      throw new Error('ErrorId');
    })
    .then((userInfo) => res.status(201).send({ data: userInfo }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        errorMessage(res, ERROR_BAD_REQUEST, 'Произошла ошибка: введены некорректные данные');
      } else if (err.message === 'ErrorId') {
        errorMessage(res, ERROR_NOT_FOUND, 'Произошла ошибка: пользователь с указанным id не найден');
      } else {
        errorMessage(res, ERROR_DEFAULT, 'Произошла ошибка при обновлении аварки профиля');
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
