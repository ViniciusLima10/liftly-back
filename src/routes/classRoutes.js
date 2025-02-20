const express = require('express');
const {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
} = require('../controllers/classController');

const router = express.Router();

// Rotas
router.post('/', createClass); // Cria uma nova aula
router.get('/', getClasses); // Lista todas as aulas
router.get('/:id', getClassById); // Busca uma aula por ID
router.put('/:id', updateClass); // Atualiza uma aula por ID
router.delete('/:id', deleteClass); // Remove uma aula por ID

module.exports = router;
