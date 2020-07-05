const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message } = err;

  if (err.name === 'ValidationError') {
    statusCode = 400;
  }

  if (err.name === 'MongoError') {
    statusCode = 409;
    message = 'Данный email уже зарегистрирован';
  }

  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
};

module.exports = errorHandler;
