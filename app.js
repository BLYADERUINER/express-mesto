require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const limiter = require('./utils/limiter');
const checkedErrors = require('./middlewares/error');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { userRouter, cardRouter } = require('./routes/index');
const { userValid, loginValid } = require('./middlewares/validate');
const RequestNotFound = require('./errors/request-not-found');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(cookieParser());

app.post('/signin', loginValid, login);
app.post('/signup', userValid, createUser);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.use('*', auth, RequestNotFound);

app.use(errors());
app.use(checkedErrors);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});
