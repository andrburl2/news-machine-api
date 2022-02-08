const NotFound = require('../errors/not-found');

const sendError = (req, res) => {
  throw new NotFound('Такой страницы не существует');
};

module.exports = sendError;