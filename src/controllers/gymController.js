const { Gym } = require('../models');


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

module.exports = { createGym, getGyms, getGymById, updateGym, deleteGym };
