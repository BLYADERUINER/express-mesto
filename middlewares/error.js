const { ERROR_DEFAULT, responseMessage } = require('../errors/statuscode');

const errorMiddleware = (err, req, res, next) => {
  const { statusCode = ERROR_DEFAULT, message } = err;

  responseMessage(res, statusCode, {
    message: statusCode === ERROR_DEFAULT
      ? 'Внутреняя ошибка сервера'
      : message,
  });

  next();
};

module.exports = errorMiddleware;
