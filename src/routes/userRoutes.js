const express = require('express');
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

// Rotas
router.post('/', createUser); // Cria um novo usuário
router.get('/', getUsers); // Lista todos os usuários
router.get('/:id', getUserById); // Busca um usuário por ID
router.put('/:id', updateUser); // Atualiza um usuário por ID
router.delete('/:id', deleteUser); // Remove um usuário por ID

module.exports = router;
