const express = require('express');
const {
  createSchedule,
  getSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
} = require('../controllers/scheduleController');

const router = express.Router();

// Rotas
router.post('/', createSchedule); // Cria um novo usuário
router.get('/', getSchedules); // Lista todos os usuários
router.get('/:id', getScheduleById); // Busca um usuário por ID
router.put('/:id', updateSchedule); // Atualiza um usuário por ID
router.delete('/:id', deleteSchedule); // Remove um usuário por ID

module.exports = router;
