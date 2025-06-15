const express = require('express');
const router = express.Router();
const { registerAndLinkUser, getMyGym } = require('../controllers/userGymController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/usergym/register', authMiddleware, registerAndLinkUser);
router.get('/my-gym', authMiddleware, getMyGym);

module.exports = router;
