const express = require('express');
const {
  registerEntry,
  registerExit,
  getCurrentOccupancy,
} = require('../controllers/gymOccupancyController');

const router = express.Router();

router.post('/entry', registerEntry);
router.post('/exit', registerExit);
router.get('/:gymId', getCurrentOccupancy);

module.exports = router;
