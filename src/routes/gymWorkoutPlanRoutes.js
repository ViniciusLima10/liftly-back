const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const gymWorkoutPlanController = require('../controllers/gymWorkoutPlanController');

const router = express.Router();

router.get('/user/:userID',    gymWorkoutPlanController.listarPorUsuario);
router.get('/trainer/:trainerId', gymWorkoutPlanController.listarPorInstrutor);

router.use(authMiddleware);

router.post('/',          gymWorkoutPlanController.criar);
router.put('/:id',        gymWorkoutPlanController.atualizar);
router.delete('/:id',     gymWorkoutPlanController.excluir);

module.exports = router;
