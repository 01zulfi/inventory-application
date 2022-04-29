const express = require('express');
const { countriesList } = require('../controllers/country-controller');
const { continentsList } = require('../controllers/continent-controller');
const { groupingsList } = require('../controllers/grouping-controller');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Countries of the World' });
});

router.get('/countries', countriesList);
router.get('/continents', continentsList);
router.get('/groupings', groupingsList);

module.exports = router;
