const JWT = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const KEY = 'mega-super-puper-duper-secret-key';

const checkedKey = () => (NODE_ENV === 'production' ? JWT_SECRET : KEY);

function generateToken(payload) {
  return JWT.sign(payload, checkedKey(), { expiresIn: '7d' });
}

function checkToken(token) {
  if (!token) {
    return false;
  }

  try {
    return JWT.verify(token, checkedKey());
  } catch (err) {
    return false;
  }
}

module.exports = {
  generateToken,
  checkToken,
};
