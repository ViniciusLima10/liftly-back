const { GymOccupancy, Gym } = require('../models');

// Registrar entrada na academia
const registerEntry = async (req, res) => {
  try {
    const { gymId } = req.body;

    const gym = await Gym.findByPk(gymId);
    if (!gym) {
      return res.status(404).json({ error: 'Academia não encontrada' });
    }

    // Obtém o último registro da ocupação para essa academia
    const lastRecord = await GymOccupancy.findOne({
      where: { gymId },
      order: [['recordedAt', 'DESC']],
    });

    const newOccupancy = lastRecord ? lastRecord.currentOccupancy + 1 : 1;

    const newRecord = await GymOccupancy.create({
      gymId,
      currentOccupancy: newOccupancy,
    });

    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar entrada', details: error.message });
  }
};

// Registrar saída da academia
const registerExit = async (req, res) => {
  try {
    const { gymId } = req.body;

    const gym = await Gym.findByPk(gymId);
    if (!gym) {
      return res.status(404).json({ error: 'Academia não encontrada' });
    }

    const lastRecord = await GymOccupancy.findOne({
      where: { gymId },
      order: [['recordedAt', 'DESC']],
    });

    const newOccupancy = lastRecord && lastRecord.currentOccupancy > 0 ? lastRecord.currentOccupancy - 1 : 0;

    const newRecord = await GymOccupancy.create({
      gymId,
      currentOccupancy: newOccupancy,
    });

    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar saída', details: error.message });
  }
};

// Buscar ocupação atual da academia
const getCurrentOccupancy = async (req, res) => {
  try {
    const { gymId } = req.params;

    const lastRecord = await GymOccupancy.findOne({
      where: { gymId },
      order: [['recordedAt', 'DESC']],
    });

    if (!lastRecord) {
      return res.status(404).json({ error: 'Nenhum registro encontrado para esta academia' });
    }

    res.json({ gymId, currentOccupancy: lastRecord.currentOccupancy });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ocupação da academia', details: error.message });
  }
};

module.exports = { registerEntry, registerExit, getCurrentOccupancy };
