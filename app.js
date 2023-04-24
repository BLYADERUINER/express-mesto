const express = require('express');
const mongoose = require('mongoose');
const { userRouter, cardRouter } = require('./routes/index');
const { ERROR_NOT_FOUND, responseMessage } = require('./utils/statuscode');

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

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', (req, res) => {
  responseMessage(res, ERROR_NOT_FOUND, { message: 'Произошла ошибка: Запрос не найден' });
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});
