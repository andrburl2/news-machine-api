const router = require('express').Router();
const { errors } = require('celebrate');

const { createUser, login } = require('../controllers/users');
const users = require('./users');
const articles = require('./articles');
const error = require('./error');

const auth = require('../middlewares/auth');
const errorHandler = require('../middlewares/errorHandler');
const { validateRegistration, validateLogin } = require('../assets/joi-schemes');
const { requestLogger, errorLogger } = require('../middlewares/logger');

router.use(requestLogger);

router.post('/signup', validateRegistration, createUser);
router.post('/signin', validateLogin, login);

router.use('/users', auth, users);
router.use('/articles', auth, articles);

router.use(errorLogger);
router.use(error);
router.use(errors());
router.use(errorHandler);

module.exports = router;
