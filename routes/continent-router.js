const express = require('express');
const {
  continentDetail,
  continentCreateGet,
  continentCreatePost,
} = require('../controllers/continent-controller');

const router = express.Router();

router.get('/create', continentCreateGet);
router.post('/create', continentCreatePost);
router.get('/:id', continentDetail);

module.exports = router;
