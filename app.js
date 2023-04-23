const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { ERROR_NOT_FOUND, errorMessage } = require('./utils/error');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64444d5dcded72f18d795c71',
  };

  next();
});

app.use(userRouter);
app.use(cardRouter);
app.use('*', (req, res) => {
  errorMessage(res, ERROR_NOT_FOUND, 'Произошла ошибка: Запрос не найден');
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});
