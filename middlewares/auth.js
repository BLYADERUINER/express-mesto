// const jwt = require('jsonwebtoken');
const { checkToken } = require('../utils/token');

function auth(req, res, next) {
  const token = req.cookies.jwt;
  const validToken = checkToken(token);

  if (!validToken) {
    return res.status(403).send({ message: 'Доступ запрещен' });
  }

  req.user = validToken;
  return next();
}

module.exports = auth;
