const express = require('express');
const {
  groupingDetail,
  groupingCreateGet,
  groupingCreatePost,
} = require('../controllers/grouping-controller');

const router = express.Router();

router.get('/create', groupingCreateGet);
router.post('/create', groupingCreatePost);
router.get('/:id', groupingDetail);

module.exports = router;
