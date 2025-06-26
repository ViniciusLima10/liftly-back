// routes/gymRoutes.js
const express = require('express');
const { User, UserGym } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const {
  createGym,
  loginGym,
  forgotPasswordGym,
  resetPasswordGym,
  getClassesForGym,
  getGyms,
  getGymById,
  updateGym,
  deleteGym,
} = require('../controllers/gymController');

const {
  registerAndLinkUser,
  getAllTrainersByGym,
  getAllStudentsByGym,
  unlinkUserFromGym
} = require('../controllers/userGymController');

const router = express.Router();

// — Rotas públicas —
router.post('/', createGym);
router.post('/login', loginGym);
router.post('/forgot-password', forgotPasswordGym);
router.post('/reset-password/:token', resetPasswordGym);

// — Rota protegida estática: listar aulas —
router.get('/classes', authMiddleware, getClassesForGym);

// A partir daqui, todas abaixo já usam authMiddleware
router.use(authMiddleware);

// — Listar personal trainers associados —
router.get('/trainers', getAllTrainersByGym);
router.get('/students', getAllStudentsByGym);


// — CRUD de academias —
router.get('/', getGyms);
router.get('/:id', getGymById);
router.put('/:id', updateGym);
router.delete('/:id', deleteGym);

// — Associação de usuário (personal/student) —
router.post('/register-user', registerAndLinkUser);
router.delete('/delete-user/:userId', unlinkUserFromGym);



module.exports = router;
