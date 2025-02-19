const express = require('express');
const {
  createClasse,
  getClasses,
  getClasseById,
  updateClasse,
  deleteClasse,
} = require('../controllers/classeController');

const router = express.Router();

// Rotas
router.post('/', createClasse); // Cria um novo Classe
router.get('/', getClasses); // Lista todos os Classes
router.get('/:id', getClasseById); // Busca um Classe por ID
router.put('/:id', updateClasse); // Atualiza um Classe por ID
router.delete('/:id', deleteClasse); // Remove um Classe por ID

module.exports = router;
