const cardRouter = require('express').Router();

const { cardValid, idValid } = require('../middlewares/validate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', cardValid, createCard);
cardRouter.delete('/:_id', idValid, deleteCard);
cardRouter.put('/:_id/likes', idValid, likeCard);
cardRouter.delete('/:_id/likes', idValid, dislikeCard);

module.exports = cardRouter;
