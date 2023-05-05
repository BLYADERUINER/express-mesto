const express = require('express');

const { cardValid, idValid } = require('../middlewares/validate');
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
cardRouter.delete('/:cardId', idValid, deleteCard);
cardRouter.put('/:cardId/likes', idValid, likeCard);
cardRouter.delete('/:cardId/likes', idValid, dislikeCard);

module.exports = cardRouter;
