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
cardRouter.delete('/:_id', idValid, deleteCard);
cardRouter.put('/:_id/likes', idValid, likeCard);
cardRouter.delete('/:_id/likes', idValid, dislikeCard);

module.exports = cardRouter;
