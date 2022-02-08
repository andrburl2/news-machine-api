const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../assets/config');

const Unauthorized = require('../errors/unauthorized');

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;

  if (!authorization) {
    throw new Unauthorized('Ошибка авторизации');
  }

  let payload;

  try {
    payload = jwt.verify(authorization, JWT_SECRET);
  } catch (err) {
    throw new Unauthorized('Ошибка авторизации');
  }

  req.user = payload;

  next();
};