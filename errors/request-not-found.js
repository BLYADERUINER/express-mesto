const NotFoundError = require('./not-found-err');

const RequestNotFound = () => {
  throw new NotFoundError('Произошла ошибка: Запрос не найден');
};

module.exports = RequestNotFound;
