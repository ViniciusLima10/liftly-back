const { Schedule, User, Class } = require('../models');

const createSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.create(req.body);
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar agendamento', details: error.message });
  }
};

const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Class, as: 'class' }
      ]
    });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar agendamentos', details: error.message });
  }
};

const getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user' },
        { model: Class, as: 'class' }
      ]
    });
    if (!schedule) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar agendamento', details: error.message });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id);
    if (!schedule) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }
    await schedule.update(req.body);
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar agendamento', details: error.message });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id);
    if (!schedule) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }
    await schedule.destroy();
    res.status(204).send(); // Sem conteúdo
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover agendamento', details: error.message });
  }
};

module.exports = { createSchedule, getSchedules, getScheduleById, updateSchedule, deleteSchedule };
