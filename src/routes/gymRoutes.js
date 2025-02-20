const express = require('express');
const {
  createGym,
  getGyms,
  getGymById,
  updateGym,
  deleteGym,
} = require('../controllers/gymController');

const router = express.Router();

// Rotas
router.post('/', createGym); // Cria um novo gym
router.get('/', getGyms); // Lista todos os gyms
router.get('/:id', getGymById); // Busca um gym por ID
router.put('/:id', updateGym); // Atualiza um gym por ID
router.delete('/:id', deleteGym); // Remove um gym por ID

module.exports = router;
