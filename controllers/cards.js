const NotFoundError = require('../errors/not-found-err');
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
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { _id } = req.params;
  const ownerId = req.user._id;

  Card.findById(_id)
    .orFail(() => {
      throw new NotFoundError('Произошла ошибка: карточка не найдена');
    })
    .then((card) => {
      if (ownerId !== String(card.owner)) {
        throw new ForbiddenError('Произошла ошибка: у вас нет прав на удаление');
      } else {
        card.deleteOne();
        responseMessage(res, RESPONSE_OK, { message: 'Карточка удалена' });
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Произошла ошибка: карточка не найдена');
    })
    .then((likes) => responseMessage(res, RESPONSE_OK, { data: likes }))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Произошла ошибка: карточка не найдена');
    })
    .then((likes) => responseMessage(res, RESPONSE_OK, { data: likes }))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
