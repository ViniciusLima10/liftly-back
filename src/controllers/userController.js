const { User } = require('../models');

// Criar um novo usuário
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
  }
};

// Listar todos os usuários
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários', details: error.message });
  }
};

// Buscar usuário por ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário', details: error.message });
  }
};

// Atualizar usuário por ID
const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário', details: error.message });
  }
};

// Remover usuário por ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    await user.destroy();
    res.status(204).send(); // Sem conteúdo
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover usuário', details: error.message });
  }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
