const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { linkUserGym } = require('../controllers/userGymController');

router.use(authMiddleware);

router.post('/link', linkUserGym);

module.exports = router;
