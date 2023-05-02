// const jwt = require('jsonwebtoken');
const { checkToken } = require('../utils/token');
const UnauthorizedError = require('../errors/bad-request-err');

function auth(req, res, next) {
  const token = req.cookies.jwt;
  const validToken = checkToken(token);

  if (!validToken) {
    throw new UnauthorizedError('Произошла ошибка: вы не авторизованы');
  }

  req.user = validToken;
  return next();
}

module.exports = auth;
