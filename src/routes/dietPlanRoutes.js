const express = require('express');
const router = express.Router();
const dietPlanController = require('../controllers/dietPlanController')


router.post('/', dietPlanController.criar);

router.get('/:userID', dietPlanController.listarPorUsuario);
router.get('/nutritionist/:nutritionistId', dietPlanController.listarPorNutricionista);


module.exports = router

