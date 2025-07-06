const dietPlan = require('../models/mongo/dietPlan');
const { User } = require('../models'); // <- models/index.js deve exportar User

const dietPlanController = {
   async criar(req, res) {
    try {
      const { studentEmail, refeicoes, nutritionistId } = req.body;

      // Busca o aluno pelo email (banco relacional)
      const student = await User.findOne({ where: { email: studentEmail } });
      if (!student) {
        return res.status(404).json({ error: 'Aluno não encontrado.' });
      }

      // Confere se o usuário encontrado é aluno
      if (!student.isStudent) {
        return res.status(400).json({ error: 'Usuário encontrado não é um aluno.' });
      }

      // Busca o nutricionista com ID enviado no body
      const nutritionist = await User.findByPk(nutritionistId);
      if (!nutritionist) {
        return res.status(404).json({ error: 'Nutricionista não encontrado.' });
      }

      if (!nutritionist.isNutritionist) {
        return res.status(400).json({ error: 'Usuário enviado não é um nutricionista.' });
      }

      // Cria a dieta no MongoDB
      const dieta = await dietPlan.create({
        userId: student.id,            // id do aluno (relacional)
        nutritionistId: nutritionist.id, // id do nutricionista do body
        refeicoes
      });

      res.status(201).json(dieta);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

    async  listarPorUsuario(req, res){
        const userId = req.params.userID
        try{
            const dieta = await dietPlan.find({ userId});
            res.status(201).json(dieta);
        } catch (err) {
            res.status(500).json({ error: err.message});
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
}

module.exports = dietPlanController;