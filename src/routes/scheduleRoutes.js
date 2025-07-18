const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const scheduleController = require('../controllers/scheduleController');

// Middleware de autenticação para aluno
router.use(authMiddleware);

// NOVAS ROTAS
router.get('/available-classes', scheduleController.getAvailableClasses);
router.post('/book', scheduleController.createBooking);
router.put('/cancel/:id', scheduleController.cancelSchedule);

// ROTAS JÁ EXISTENTES
router.get('/', scheduleController.getSchedules);
router.get('/:id', scheduleController.getScheduleById);
router.post('/', scheduleController.createSchedule);
router.put('/:id', scheduleController.updateSchedule);
router.delete('/:id', scheduleController.deleteSchedule);

module.exports = router;