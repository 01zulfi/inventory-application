const express = require('express');
const { countriesList } = require('../controllers/country-controller');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Countries of the World' });
});

router.get('/countries', countriesList);

module.exports = router;
