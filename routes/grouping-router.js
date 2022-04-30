const express = require('express');
const {
  groupingDetail,
  groupingCreateGet,
  groupingCreatePost,
  groupingUpdateGet,
  groupingUpdatePost,
  groupingDeleteGet,
  groupingDeletePost,
} = require('../controllers/grouping-controller');

const router = express.Router();

router.get('/create', groupingCreateGet);
router.post('/create', groupingCreatePost);
router.get('/:id/update', groupingUpdateGet);
router.post('/:id/update', groupingUpdatePost);
router.get('/:id/delete', groupingDeleteGet);
router.post('/:id/delete', groupingDeletePost);
router.get('/:id', groupingDetail);

module.exports = router;
