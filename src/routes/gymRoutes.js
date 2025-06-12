const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  createGym,
  getGyms,
  getGymById,
  updateGym,
  deleteGym,
  loginGym,
  forgotPasswordGym,
  resetPasswordGym,
  registerUserByGym 
} = require('../controllers/gymController');

const router = express.Router();

router.post('/', createGym);
router.post('/login', loginGym);
router.post('/forgot-password', forgotPasswordGym);
router.post('/reset-password/:token', resetPasswordGym);

router.use(authMiddleware);

router.get('/', getGyms);
router.get('/:id', getGymById);
router.put('/:id', updateGym);
router.delete('/:id', deleteGym);
 router.post('/register-user', registerUserByGym);

module.exports = router;
