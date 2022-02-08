const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../assets/config');
const User = require('../models/user');

const NotFound = require('../errors/not-found');

module.exports.getInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send({
          status: 200,
          name: user.name,
          email: user.email,
        });
      } else {
        throw new NotFound('Не удается найти пользователя');
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  User.validate({ name, email, password })
    .then(() => bcrypt.hash(password, 10))
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.status(201)
        .send({
          status: 201,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });

      res.status(200).send({
        status: 200,
      });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  res.clearCookie('jwt', {
    httpOnly: true,
  });

  res.status(200).send({ status: 200 });
};