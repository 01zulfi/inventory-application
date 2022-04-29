const express = require('express');
const { countryDetail } = require('../controllers/country-controller');

const router = express.Router();

router.get('/:id', countryDetail);

module.exports = router;
