require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const { PORT, MONGO_ADRESS } = require('./assets/config');
const router = require('./routes/index');

const bodyParser = require('./middlewares/bodyParser');
const cookieParser = require('./middlewares/cookieParser');
const helmet = require('./middlewares/helmet');
const rateLimit = require('./middlewares/rateLimit');
const cors = require('./middlewares/cors');

mongoose.connect(MONGO_ADRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => {
    const app = express();

    app.listen(PORT, () => {});

    app.use(helmet);
    app.use(rateLimit);

    app.use(bodyParser);
    app.use(cookieParser);

    app.use(cors);

    app.use('/', router);
  })
  .catch((err) => {
    console.error(`Ошибка подключения к базе данных ${err}`);
  });