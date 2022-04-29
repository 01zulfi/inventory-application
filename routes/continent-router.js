const express = require('express');
const { continentDetail } = require('../controllers/continent-controller');

const router = express.Router();

router.get('/:id', continentDetail);

module.exports = router;
