const express = require('express');
const { getCards, createCard, deleteCard } = require('../controllers/cards');

const cardRouter = express.Router();

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', createCard);
cardRouter.delete('/cards/:cardId', deleteCard);

module.exports = cardRouter;
