const NotFoundError = require('./not-found-err');

const RequestNotFound = (req, res, next) => next(new NotFoundError('Произошла ошибка: Запрос не найден'));

module.exports = RequestNotFound;
