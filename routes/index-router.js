const express = require('express');
const index = require('../controllers/index-controller');
const { countriesList } = require('../controllers/country-controller');
const { continentsList } = require('../controllers/continent-controller');
const { groupingsList } = require('../controllers/grouping-controller');

const router = express.Router();

router.get('/', index);

router.get('/countries', countriesList);
router.get('/continents', continentsList);
router.get('/groupings', groupingsList);

module.exports = router;
