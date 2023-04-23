const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка с получением пользователей' }));
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
        res.status(404).send({ message: 'Произошла ошибка пользователь не найден' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка при получении пользователя' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Произошла ошибка, введены некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка при создании пользователя' });
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
        res.status(400).send({ message: 'Произошла ошибка, введены некорректные данные' });
      } else if (err.message === 'ErrorId') {
        res.status(404).send({ message: 'Произошла ошибка пользователь с указанным id не найден' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка при обновлении профиля' });
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
        res.status(400).send({ message: 'Произошла ошибка, введены некорректные данные' });
      } else if (err.message === 'ErrorId') {
        res.status(404).send({ message: 'Произошла ошибка пользователь с указанным id не найден' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка при обновлении аварки профиля' });
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
