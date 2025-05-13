const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const gymWorkoutPlanController = require('../controllers/gymWorkoutPlanController');

router.use(authMiddleware);

router.post('/', gymWorkoutPlanController.criar);
router.get('/:userID', gymWorkoutPlanController.listarPorUsuario);

module.exports = router;
