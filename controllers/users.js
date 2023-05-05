const bcrypt = require('bcryptjs');

const ConflictError = require('../errors/conflict-err');
const NotFoundError = require('../errors/not-found-err');
const { generateToken } = require('../utils/token');

const User = require('../models/user');
const {
  RESPONSE_OK,
  RESPONSE_CREATED,
  responseMessage,
} = require('../errors/statuscode');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => responseMessage(res, RESPONSE_OK, { data: users }))
    .catch(next);
};

const getUserOnId = (req, res, next) => {
  const { _id } = req.params;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Произошла ошибка: пользователь с указанным id не найден');
      }

      responseMessage(res, RESPONSE_OK, { data: user });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      responseMessage(res, RESPONSE_CREATED, {
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        throw new ConflictError('Пользователь с таким email уже существует');
      }
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const owner = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(owner, { name, about }, { new: true, runValidators: true })
    .then((userInfo) => responseMessage(res, RESPONSE_OK, { data: userInfo }))
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const owner = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(owner, { avatar }, { new: true })
    .then((userInfo) => responseMessage(res, RESPONSE_OK, { data: userInfo }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken({ _id: user._id });

      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true });
      res.send({ token });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => responseMessage(res, RESPONSE_OK, { data: user }))
    .catch(next);
};

module.exports = {
  getUsers,
  getUserOnId,
  getCurrentUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
};
