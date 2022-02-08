const userRouter = require('express').Router();
const { getInfo } = require('../controllers/users');

userRouter.get('/', getInfo);

module.exports = userRouter;