const { Schedule, User, Class } = require('../models');
const { Op } = require('sequelize');

const getAvailableClasses = async (req, res) => {
  try {
    const gymId = req.query.gymId;
    if (!gymId) return res.status(400).json({ error: 'gymId é obrigatório' });

    const classes = await Class.findAll({
      where: {
        gymId,
        startTime: {
          [Op.gt]: new Date() // só aulas futuras
        }
      },
      include: [
        { model: User, as: 'instructor' },
        { model: Schedule, as: 'Schedules' }
      ]
    });

    const formatted = classes.map(c => {
      const agendados = c.Schedules?.filter(s => s.status === 'Confirmado')?.length || 0;
      return {
        id: c.id,
        name: c.name,
        startTime: c.startTime,
        instructor: c.instructor,
        availableSlots: c.maxCapacity - agendados,
        isFull: agendados >= c.maxCapacity
      };
    });

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar aulas disponíveis', details: err.message });
  }
};

const createBooking = async (req, res) => {
  try {
    const userId = req.user.sub;


    const { classId } = req.body;

    const existing = await Schedule.findOne({ where: { userId, classId, status: 'Confirmado' } });
    if (existing) return res.status(400).json({ error: 'Você já agendou esta aula.' });

    const agendados = await Schedule.count({ where: { classId, status: 'Confirmado' } });
    const aula = await Class.findByPk(classId);
    if (!aula) return res.status(404).json({ error: 'Aula não encontrada.' });
    if (agendados >= aula.maxCapacity) return res.status(400).json({ error: 'Aula lotada.' });

    const schedule = await Schedule.create({ userId, classId });
    res.status(201).json({ message: 'Aula agendada com sucesso!', schedule });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao agendar aula', details: err.message });
  }
};

const cancelSchedule = async (req, res) => {
  try {
   const userId = req.user.sub;


    const schedule = await Schedule.findByPk(req.params.id);
    if (!schedule || schedule.userId !== userId) {
      return res.status(403).json({ error: 'Você não tem permissão para cancelar este agendamento.' });
    }

    schedule.status = 'Cancelado';
    await schedule.save();

    res.json({ message: 'Agendamento cancelado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao cancelar agendamento', details: err.message });
  }
};


const createSchedule = async (req, res) => {
  try {
    const userId = req.user.sub;


    const { classId } = req.body;

    if (!userId || !classId) {
      return res.status(400).json({ error: 'Usuário ou aula não informados.' });
    }

    const aula = await Class.findByPk(classId);
    if (!aula) {
      return res.status(404).json({ error: 'Aula não encontrada.' });
    }

    const jaAgendado = await Schedule.findOne({ where: { userId, classId } });
    if (jaAgendado) {
      return res.status(409).json({ error: 'Você já está agendado nessa aula.' });
    }

    const totalAgendados = await Schedule.count({ where: { classId } });
    if (totalAgendados >= aula.maxCapacity) {
      return res.status(403).json({ error: 'Aula está com capacidade máxima.' });
    }

    const schedule = await Schedule.create({
      userId,
      classId,
      status: 'Confirmado'
    });

    return res.status(201).json(schedule);

  } catch (error) {
    console.error('❌ Erro ao criar agendamento:', error);
    return res.status(500).json({ error: 'Erro ao agendar aula', details: error.message });
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

const getSchedules = async (req, res) => {
 console.log("↪️ req.user =", req.user); 
  try {
    const userId = req.user.sub;


    const schedules = await Schedule.findAll({
      where: { userId },
      include: [
        { model: User, as: 'user' },
        { model: Class, as: 'class', include: [{ model: User, as: 'instructor' }] }
      ]
    });
    res.json(schedules);
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    res.status(500).json({ error: 'Erro ao buscar agendamentos', details: error.message });
  }
};



module.exports = { createSchedule, getScheduleById, updateSchedule, deleteSchedule, getAvailableClasses, createBooking, cancelSchedule, getSchedules};
