const userRouter = require('express').Router();
const { getInfo } = require('../controllers/users');

userRouter.get('/me', getInfo);

module.exports = userRouter;
