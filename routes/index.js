const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');

const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { userValid, loginValid } = require('../middlewares/validate');
const RequestNotFound = require('../errors/request-not-found');

router.post('/signin', loginValid, login);
router.post('/signup', userValid, createUser);

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('*', auth, RequestNotFound);

module.exports = router;
