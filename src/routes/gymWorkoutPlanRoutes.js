const express = require('express');
const router = express.Router();
const gymWorkoutPlanController = require('../controllers/gymWorkoutPlanController')


router.post('/', gymWorkoutPlanController.criar);

router.get('/:userID', gymWorkoutPlanController.listarPorUsuario);

module.exports = router

