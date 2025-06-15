const express = require('express');
const router = express.Router();
const { registerAndLinkUser } = require('../controllers/userGymController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/usergym/register', authMiddleware, registerAndLinkUser);

module.exports = router;
