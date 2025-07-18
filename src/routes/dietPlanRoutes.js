const express = require('express');
const router = express.Router();
const dietPlanController = require('../controllers/dietPlanController');

router.get('/nutritionist/:nutritionistId', dietPlanController.listarPorNutricionista);
router.get('/user/:userID', dietPlanController.listarPorUsuario);
router.get('/email/:email', dietPlanController.buscarPorEmail);

router.post('/', dietPlanController.criar);

router.delete('/:userId/:index', dietPlanController.excluirPorIndice);

module.exports = router;
