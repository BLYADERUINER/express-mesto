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
        res.status(500).send({ message: 'Произошла ошибка с получением пользователя' });
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
        res.status(500).send({ message: 'Произошла ошибка при отправке информации о пользователе' });
      }
    });
};

module.exports = {
  getUsers,
  getUserOnId,
  createUser,
};
