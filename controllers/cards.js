const Card = require('../models/card');
const {
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
  errorMessage,
} = require('../utils/error');

const getCards = (req, res) => {
  Card.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => errorMessage(res, ERROR_DEFAULT, 'Произошла ошибка при получении карточек'));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        errorMessage(res, ERROR_BAD_REQUEST, 'Произошла ошибка: введены некорректные данные');
      } else {
        errorMessage(res, ERROR_DEFAULT, 'Произошла ошибка при создании карточки');
      }
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      throw new Error('ErrorId');
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        errorMessage(res, ERROR_BAD_REQUEST, 'Произошла ошибка: некорректный запрос');
      } else if (err.message === 'ErrorId') {
        errorMessage(res, ERROR_NOT_FOUND, 'Произошла ошибка: карточка не найдена');
      } else {
        errorMessage(res, ERROR_DEFAULT, 'Произошла ошибка при запросе на удаление');
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('ErrorId');
    })
    .then((likes) => res.status(200).send({ data: likes }))
    .catch((err) => {
      if (err.name === 'CastError') {
        errorMessage(res, ERROR_BAD_REQUEST, 'Произошла ошибка: некорректный запрос');
      } else if (err.message === 'ErrorId') {
        errorMessage(res, ERROR_NOT_FOUND, 'Произошла ошибка: карточка не найдена');
      } else {
        errorMessage(res, ERROR_DEFAULT, 'Произошла ошибка при запросе на лайк');
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('ErrorId');
    })
    .then((likes) => res.status(200).send({ data: likes }))
    .catch((err) => {
      if (err.name === 'CastError') {
        errorMessage(res, ERROR_BAD_REQUEST, 'Произошла ошибка: некорректный запрос');
      } else if (err.message === 'ErrorId') {
        errorMessage(res, ERROR_NOT_FOUND, 'Произошла ошибка: карточка не найдена');
      } else {
        errorMessage(res, ERROR_DEFAULT, 'Произошла ошибка при запросе на дизлайк');
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
