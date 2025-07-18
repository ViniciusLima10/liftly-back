const { Class, UserGym } = require('../models');

const createClass = async (req, res) => {
  try {
    const gymId = req.user?.sub; // ← extraído do token JWT

    if (!gymId) {
      return res.status(401).json({ error: 'Academia não autenticada.' });
    }

    const newClass = await Class.create({
      ...req.body,
      gymId
    });

    res.status(201).json(newClass);
  } catch (error) {
    console.error("❌ Erro ao criar aula:", error);
    res.status(500).json({ error: 'Erro ao criar aula', details: error.message });
  }
};


const getClasses = async (req, res) => {
  try {
    const classes = await Class.findAll();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar aulas', details: error.message });
  }
};

const getClassById = async (req, res) => {
  try {
    const classInstance = await Class.findByPk(req.params.id);
    if (!classInstance) {
      return res.status(404).json({ error: 'Aula não encontrada' });
    }
    res.json(classInstance);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar aula', details: error.message });
  }
};

const updateClass = async (req, res) => {
  try {
    const classInstance = await Class.findByPk(req.params.id);
    if (!classInstance) {
      return res.status(404).json({ error: 'Aula não encontrada' });
    }
    await classInstance.update(req.body);
    res.json(classInstance);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar aula', details: error.message });
  }
};

const deleteClass = async (req, res) => {
  try {
    const classInstance = await Class.findByPk(req.params.id);
    if (!classInstance) {
      return res.status(404).json({ error: 'Aula não encontrada' });
    }
    await classInstance.destroy();
    res.status(204).send(); // Sem conteúdo
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover aula', details: error.message });
  }
};


const getAvailableClassesForStudent = async (req, res) => {
  const userId = req.user?.sub;

  try {
    // Verifica se o aluno está vinculado a alguma academia
    const vinculo = await UserGym.findOne({ where: { userId } });
    if (!vinculo) {
      return res.status(403).json({ error: 'Aluno não vinculado a nenhuma academia.' });
    }

    // Busca as aulas da academia do aluno
    const aulas = await Class.findAll({
      where: { gymId: vinculo.gymId }
    });

    return res.json(aulas);

  } catch (err) {
    console.error('❌ Erro ao buscar aulas disponíveis:', err);
    return res.status(500).json({ error: 'Erro ao buscar aulas', detail: err.message });
  }
};


module.exports = { createClass, getClasses, getClassById, updateClass, deleteClass, getAvailableClassesForStudent};