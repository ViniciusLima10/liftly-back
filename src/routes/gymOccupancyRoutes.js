const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  registerEntry,
  registerExit,
  getCurrentOccupancy,
} = require('../controllers/gymOccupancyController');

const router = express.Router();

router.use(authMiddleware);

router.post('/entry', registerEntry);
router.post('/exit', registerExit);
router.get('/:gymId', getCurrentOccupancy);

module.exports = router;