const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  createUser, // Esta é a função que será o handler direto para /cadastro/:role
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


// Rota pública - Login e Cadastro
router.post('/login', loginUser); // Rota de login (sem token)
router.post('/cadastro/:role', createUser);  // Rota de cadastro (sem token)
router.post('/forgotPassword', forgotPassword); // Rota para esqueci a senha (sem token)
router.put('/reset-password/:token', resetPassword); // Rota para resetar senha (sem token)

// Aplica o middleware authMiddleware apenas nas rotas que exigem autenticação (protegidas)
router.use(authMiddleware);

// Rota protegida - Requer token JWT
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/dietplans/:id', findUserDietPlans);
router.get('/workoutplans/:id', findUserWorkoutPlans);
router.post('/updateProfilePic/:id', uploadProfilePicMiddleware.single('profilePic'), uploadProfilePic);


module.exports = router;