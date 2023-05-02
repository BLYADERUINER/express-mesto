const { ERROR_DEFAULT } = require('../errors/statuscode');

const errorMiddleware = (err, req, res, next) => {
  const { statusCode = ERROR_DEFAULT, message } = err;

  res.status(statusCode).send({
    message: statusCode === ERROR_DEFAULT
      ? 'Внутреняя ошибка сервера'
      : message,
  });

  next();
};

module.exports = errorMiddleware;
