const router = require('express').Router();
const { errors } = require('celebrate');

const { createUser, login, logout } = require('../controllers/users');
const users = require('./users');
const articles = require('./articles');

const auth = require('../middlewares/auth');

const errorHandler = require('../middlewares/errorHandler');
const sendError = require('./error');

const { validateRegistration, validateLogin } = require('../assets/joi-schemes');
const { requestLogger, errorLogger } = require('../middlewares/logger');

router.use(requestLogger);

router.post('/signup', validateRegistration, createUser);
router.post('/signin', validateLogin, login);
router.post('/logout', logout);

router.use('/users', auth, users);
router.use('/articles', auth, articles);

router.use(errorLogger);
router.use('*', sendError);
router.use(errors());
router.use(errorHandler);

module.exports = router;