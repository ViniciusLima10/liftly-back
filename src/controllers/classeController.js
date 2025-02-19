const { Class } = require('../models');

const createClasse = async (req, res) => {
  try {
    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (error) {
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

const getClasseById = async (req, res) => {
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

const updateClasse = async (req, res) => {
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

const deleteClasse = async (req, res) => {
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

module.exports = { createClasse, getClasses, getClasseById, updateClasse, deleteClasse };
