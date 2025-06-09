const { Gym } = require('../models');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'troque_para_variavel_ambiente_segura';
const JWT_EXPIRES_IN = '8h'; // ajuste conforme necessidade

const createGym = async (req, res) => {
  try {
    const gym = await Gym.create(req.body);
    res.status(201).json(gym);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar academia', details: error.message });
  }
};

const getGyms = async (req, res) => {
  try {
    const gyms = await Gym.findAll();
    res.json(gyms);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar academias', details: error.message });
  }
};

const getGymById = async (req, res) => {
  try {
    const gym = await Gym.findByPk(req.params.id);
    if (!gym) {
      return res.status(404).json({ error: 'Academia não encontrada' });
    }
    res.json(gym);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar academia', details: error.message });
  }
};

const updateGym = async (req, res) => {
  try {
    const gym = await Gym.findByPk(req.params.id);
    if (!gym) {
      return res.status(404).json({ error: 'Academia não encontrada' });
    }
    await gym.update(req.body);
    res.json(gym);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar academia', details: error.message });
  }
};

const deleteGym = async (req, res) => {
  try {
    const gym = await Gym.findByPk(req.params.id);
    if (!gym) {
      return res.status(404).json({ error: 'Academia não encontrada' });
    }
    await gym.destroy();
    res.status(204).send(); // Sem conteúdo
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover academia', details: error.message });
  }
};

const loginGym = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
  }

  try {
    const gym = await Gym.scope(null).findOne({ where: { email } });
    if (!gym) {
      return res.status(404).json({ error: 'Academia não encontrada' });
    }

    const validPassword = await gym.validatePassword(password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const payload = {
      sub: gym.id,
      name: gym.name,
      role: 'gym'
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.status(200).json({ message: 'Login realizado com sucesso', token });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao realizar login', details: error.message });
  }
};

module.exports = {
  createGym,
  getGyms,
  getGymById,
  updateGym,
  deleteGym,
  loginGym
};
