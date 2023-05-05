const { celebrate, Joi } = require('celebrate');

const urlPattern = /(http:\/\/|https:\/\/)(w{3})*[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]/;

const userValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlPattern),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const infoUpdateValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const avatarUpdateValid = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlPattern),
  }),
});

const loginValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const cardValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlPattern),
  }),
});

module.exports = {
  userValid,
  infoUpdateValid,
  avatarUpdateValid,
  loginValid,
  cardValid,
};
