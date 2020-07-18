const router = require('express').Router();
const cors = require('cors');

const corsOptions = {
  origin: ['https://andrburl2.github.io', 'https://news-machine.ml', 'https://www.news-machine.ml'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
  credentials: true,
};

router.use(cors(corsOptions));

module.exports = router;
