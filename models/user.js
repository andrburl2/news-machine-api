const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const BadRequest = require('../errors/bad-request');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Введите валидный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 6,
    validate: {
      validator: (password) => /^\S{6,}$/.test(password),
      message: 'Пароль должен состоять как минимум из 6 символов',
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new BadRequest('Неправильно введены почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new BadRequest('Неправильно введены почта или пароль');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
