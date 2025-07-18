const dietPlan = require('../models/mongo/dietPlan');
const { User } = require('../models');

const dietPlanController = {
  async criar(req, res) {
    try {
      const { studentEmail, refeicoes, nutritionistId, nomeDieta } = req.body;

      const student = await User.findOne({ where: { email: studentEmail } });
      if (!student) return res.status(404).json({ error: 'Aluno não encontrado.' });
      if (!student.isStudent) return res.status(400).json({ error: 'Usuário encontrado não é um aluno.' });

      const nutritionist = await User.findByPk(nutritionistId);
      if (!nutritionist) return res.status(404).json({ error: 'Nutricionista não encontrado.' });
      if (!nutritionist.isNutritionist) return res.status(400).json({ error: 'Usuário enviado não é um nutricionista.' });

      // Armazena nomeDieta dentro da primeira refeição (sem alterar schema)
      if (refeicoes.length > 0) {
        refeicoes[0].nomeDietaVirtual = nomeDieta;
      }

      const dieta = await dietPlan.create({
        userId: student.id,
        nutritionistId: nutritionist.id,
        refeicoes
      });

      res.status(201).json(dieta);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  async listarPorUsuario(req, res) {
    const userId = req.params.userID;
    try {
      const dietas = await dietPlan.find({ userId });
      const resultado = dietas.map(d => ({
        ...d.toObject(),
        nomeDieta: d.refeicoes[0]?.nomeDietaVirtual || ''
      }));
      res.status(200).json(resultado);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async listarPorNutricionista(req, res) {
    const nutritionistId = req.params.nutritionistId;
    try {
      const dietas = await dietPlan.find({ nutritionistId });
      res.status(200).json(dietas);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async buscarPorEmail(req, res) {
    const email = decodeURIComponent(req.params.email);
    try {
      const student = await User.findOne({ where: { email } });
      if (!student) return res.status(404).json({ error: 'Aluno não encontrado.' });

      const dietas = await dietPlan.find({ userId: student.id });
      if (!dietas || dietas.length === 0) return res.status(404).json({ error: 'Nenhuma dieta encontrada.' });

      const resultado = dietas.map(d => ({
        ...d.toObject(),
        nomeDieta: d.refeicoes[0]?.nomeDietaVirtual || ''
      }));

      res.json({
        userId: student.id,
        dietas: resultado
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar dieta.' });
    }
  },

  async excluirPorIndice(req, res) {
    const { userId, index } = req.params;
    try {
      const dietas = await dietPlan.find({ userId });
      if (!dietas || dietas.length <= index) {
        return res.status(404).json({ error: 'Dieta não encontrada.' });
      }

      const dietaParaExcluir = dietas[index];
      await dietPlan.findByIdAndDelete(dietaParaExcluir._id);

      res.status(200).json({ message: 'Dieta removida com sucesso.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao excluir dieta.' });
    }
  }
};

module.exports = dietPlanController;
