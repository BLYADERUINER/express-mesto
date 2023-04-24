const mongoose = require('mongoose');

const { CastError, ValidationError } = mongoose.Error;
const Card = require('../models/card');
const {
  RESPONSE_OK,
  RESPONSE_CREATED,
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
  responseMessage,
} = require('../utils/statuscode');

const getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((users) => responseMessage(res, RESPONSE_OK, { data: users }))
    .catch(() => responseMessage(res, ERROR_DEFAULT, { message: 'Произошла ошибка при получении карточек' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => responseMessage(res, RESPONSE_CREATED, { data: card }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        responseMessage(res, ERROR_BAD_REQUEST, { message: 'Произошла ошибка: введены некорректные данные' });
      } else {
        responseMessage(res, ERROR_DEFAULT, { message: 'Произошла ошибка при создании карточки' });
      }
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      throw new Error('ErrorId');
    })
    .then((card) => responseMessage(res, RESPONSE_OK, { data: card }))
    .catch((err) => {
      if (err instanceof CastError) {
        responseMessage(res, ERROR_BAD_REQUEST, { message: 'Произошла ошибка: некорректный запрос' });
      } else if (err.message === 'ErrorId') {
        responseMessage(res, ERROR_NOT_FOUND, { message: 'Произошла ошибка: карточка не найдена' });
      } else {
        responseMessage(res, ERROR_DEFAULT, { message: 'Произошла ошибка при запросе на удаление' });
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
    .then((likes) => responseMessage(res, RESPONSE_OK, { data: likes }))
    .catch((err) => {
      if (err instanceof CastError) {
        responseMessage(res, ERROR_BAD_REQUEST, { message: 'Произошла ошибка: некорректный запрос' });
      } else if (err.message === 'ErrorId') {
        responseMessage(res, ERROR_NOT_FOUND, { message: 'Произошла ошибка: карточка не найдена' });
      } else {
        responseMessage(res, ERROR_DEFAULT, { message: 'Произошла ошибка при запросе на лайк' });
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
    .then((likes) => responseMessage(res, RESPONSE_OK, { data: likes }))
    .catch((err) => {
      if (err instanceof CastError) {
        responseMessage(res, ERROR_BAD_REQUEST, { message: 'Произошла ошибка: некорректный запрос' });
      } else if (err.message === 'ErrorId') {
        responseMessage(res, ERROR_NOT_FOUND, { message: 'Произошла ошибка: карточка не найдена' });
      } else {
        responseMessage(res, ERROR_DEFAULT, { message: 'Произошла ошибка при запросе на дизлайк' });
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
