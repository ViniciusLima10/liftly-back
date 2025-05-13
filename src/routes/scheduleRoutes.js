const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  createSchedule,
  getSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
} = require('../controllers/scheduleController');

const router = express.Router();

router.use(authMiddleware);

router.post('/', createSchedule);
router.get('/', getSchedules);
router.get('/:id', getScheduleById);
router.put('/:id', updateSchedule);
router.delete('/:id', deleteSchedule);

module.exports = router;
