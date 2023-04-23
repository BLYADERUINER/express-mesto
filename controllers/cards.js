const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка с получением карточек' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Произошла ошибка, введены некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка при отправке карточки' });
      }
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      throw new Error('ErrorId');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'ErrorId') {
        res.status(404).send({ message: 'Произошла ошибка карточка не найдена' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка при запросе на удаление' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
