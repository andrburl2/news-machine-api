const error = require('express').Router();

error.use('*', (req, res) => {
  res.status(404).send({ message: 'Такой страницы не существует' });
});

module.exports = error;
