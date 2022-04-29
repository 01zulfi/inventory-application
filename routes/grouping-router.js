const express = require('express');
const {
  groupingDetail,
  groupingCreateGet,
} = require('../controllers/grouping-controller');

const router = express.Router();

router.get('/create', groupingCreateGet);
router.get('/:id', groupingDetail);

module.exports = router;
