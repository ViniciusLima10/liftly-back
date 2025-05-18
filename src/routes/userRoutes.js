const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  findUserDietPlans,
  findUserWorkoutPlans,
  resetPassword,
  forgotPassword,
  uploadProfilePic
} = require('../controllers/userController');

const uploadProfilePicMiddleware = require('../middleware/uploadProfilePicMiddleware');

const router = express.Router();

// Rota pública colocada antes do middleware para criar usuário
router.post('/login', loginUser);
router.post('/', createUser);
router.post('/forgotPassword', forgotPassword);
router.put('/reset-password/:token', resetPassword);


router.use(authMiddleware);

router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/dietplans/:id', findUserDietPlans);
router.get('/workoutplans/:id', findUserWorkoutPlans);
router.post('/updateProfilePic/:id', uploadProfilePicMiddleware.single('profilePic'), uploadProfilePic)
module.exports = router;
