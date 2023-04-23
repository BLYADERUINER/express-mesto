const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_DEFAULT = 500;

const errorMessage = (res, err, message) => res.status(err).send({ message });

module.exports = {
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
  errorMessage,
};
