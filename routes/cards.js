const express = require('express');

const { cardValid } = require('../middlewares/validate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const cardRouter = express.Router();

cardRouter.get('/', getCards);
cardRouter.post('/', cardValid, createCard);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardRouter;
