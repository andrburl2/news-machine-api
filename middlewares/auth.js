const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../assets/config');

const UnauthorizedError = require('../errors/unauthorized-error');

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;

  if (!authorization) {
    throw new UnauthorizedError('Ошибка авторизации');
  }

  let payload;

  try {
    payload = jwt.verify(authorization, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError('Ошибка авторизации');
  }

  req.user = payload;

  next();
};
