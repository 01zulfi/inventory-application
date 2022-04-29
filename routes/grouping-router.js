const express = require('express');
const { groupingDetail } = require('../controllers/grouping-controller');

const router = express.Router();

router.get('/:id', groupingDetail);

module.exports = router;
