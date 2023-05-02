const mongoose = require('mongoose');

const { CastError, ValidationError } = mongoose.Error;
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const Card = require('../models/card');
const {
  RESPONSE_OK,
  RESPONSE_CREATED,
  responseMessage,
} = require('../errors/statuscode');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((users) => responseMessage(res, RESPONSE_OK, { data: users }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => responseMessage(res, RESPONSE_CREATED, { data: card }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        throw new BadRequestError('Произошла ошибка: введены некорректные данные');
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const ownerId = req.user._id;

  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Произошла ошибка: карточка не найдена');
    })
    .then((card) => {
      if (ownerId === String(card.owner)) {
        Card.findByIdAndDelete(cardId)
          .then((data) => responseMessage(res, RESPONSE_OK, { data }));
      } else {
        throw new ForbiddenError('Произошла ошибка: у вас нет прав на удаление');
      }
    })
    .catch((err) => {
      if (err instanceof CastError) {
        throw new BadRequestError('Произошла ошибка: некорректный запрос');
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Произошла ошибка: карточка не найдена');
    })
    .then((likes) => responseMessage(res, RESPONSE_OK, { data: likes }))
    .catch((err) => {
      if (err instanceof CastError) {
        throw new BadRequestError('Произошла ошибка: некорректный запрос');
      }
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Произошла ошибка: карточка не найдена');
    })
    .then((likes) => responseMessage(res, RESPONSE_OK, { data: likes }))
    .catch((err) => {
      if (err instanceof CastError) {
        throw new BadRequestError('Произошла ошибка: некорректный запрос');
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
