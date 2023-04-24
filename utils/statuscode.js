const RESPONSE_OK = 200;
const RESPONSE_CREATED = 201;
const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_DEFAULT = 500;

const responseMessage = (res, status, answer) => res.status(status).send(answer);

module.exports = {
  RESPONSE_OK,
  RESPONSE_CREATED,
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
  responseMessage,
};
