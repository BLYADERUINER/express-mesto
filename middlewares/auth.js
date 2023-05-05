// const jwt = require('jsonwebtoken');
const { checkToken } = require('../utils/token');
const UnauthorizedError = require('../errors/unauthorized-err');

function auth(req, res, next) {
  const token = req.cookies.jwt;
  const validToken = checkToken(token);

  if (!validToken) {
    next(new UnauthorizedError('Произошла ошибка: вы не авторизованы'));
  }

  req.user = validToken;
  return next();
}

module.exports = auth;
