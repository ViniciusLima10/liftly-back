const { User } = require('../models');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

const createUser = async (req, res) => {
  try {
    const { name, email, password, telefone, altura, peso } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'E-mail já cadastrado.' });
    }

    const user = await User.create({
      name,
      email,
      password,
      telefone,
      altura,
      peso
    });

    const token = generateToken({ id: user.id, email: user.email });

    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    });

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
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover usuário', details: error.message });
  }
};

const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body; 
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    const token = generateToken({ id: user.id, email: user.email });

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    });

  } catch (error) {
    res.status(500).json({ error: 'Erro no login', details: error.message });
  }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser };
