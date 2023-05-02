// const jwt = require('jsonwebtoken');
const { checkToken } = require('../utils/token');
const ForbiddenError = require('../errors/forbidden-err');

function auth(req, res, next) {
  const token = req.cookies.jwt;
  const validToken = checkToken(token);

  if (!validToken) {
    throw new ForbiddenError('Произошла ошибка: Доступ запрещен');
  }

  req.user = validToken;
  return next();
}

module.exports = auth;
