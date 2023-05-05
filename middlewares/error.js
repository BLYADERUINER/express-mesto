const { ERROR_DEFAULT, ERROR_CONFLICT, responseMessage } = require('../errors/statuscode');

const errorMiddleware = (err, req, res, next) => {
  const { statusCode = ERROR_DEFAULT, message } = err;

  if (err.code === 11000) {
    responseMessage(res, ERROR_CONFLICT, { message: 'Пользователь с таким email уже существует' });
    return;
  }

  responseMessage(res, statusCode, {
    message: statusCode === ERROR_DEFAULT
      ? 'Внутреняя ошибка сервера'
      : message,
  });

  next();
};

module.exports = errorMiddleware;
