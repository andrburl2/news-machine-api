const router = require('express').Router();
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:8080'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
  credentials: true,
};

router.use(cors(corsOptions));

module.exports = router;