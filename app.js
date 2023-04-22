const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.use(userRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
