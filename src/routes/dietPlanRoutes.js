const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const dietPlanController = require('../controllers/dietPlanController');

router.use(authMiddleware);

router.post('/', dietPlanController.criar);
router.get('/:userID', dietPlanController.listarPorUsuario);

module.exports = router;
