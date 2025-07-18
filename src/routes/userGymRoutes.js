const express = require('express');
const router = express.Router();
const { registerAndLinkUser, getMyGym, unlinkUserFromGym } = require('../controllers/userGymController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/usergym/register', authMiddleware, registerAndLinkUser);
router.get('/my-gym', authMiddleware, getMyGym);

router.delete('/:userId/unlink', unlinkUserFromGym);


module.exports = router;