const gymWorkoutPlan = require('../models/mongo/gymWorkoutPlan');
const { User } = require('../models');



const gymWorkoutPlanController = {

  async criar(req, res) {
    try {
      const { studentEmail, trainerId, exercises } = req.body;

      const student = await User.findOne({ where: { email: studentEmail } });
      if (!student) {
        return res.status(404).json({ error: 'Aluno não encontrado.' });
      }
      if (!student.isStudent) {
        return res.status(400).json({ error: 'Usuário encontrado não é um aluno.' });
      }

      const trainer = await User.findByPk(trainerId);
      if (!trainer) {
        return res.status(404).json({ error: 'Instrutor não encontrado.' });
      }
      if (!trainer.isPersonal) {
        return res.status(400).json({ error: 'Usuário encontrado não é um instrutor.' });
      }

      const ficha = {
        nomeFicha: `Ficha ${new Date().toLocaleDateString()}`,
        dataCriacao: new Date(),
        exercicios: exercises,
      };

      let plano = await gymWorkoutPlan.findOne({ userId: student.id });

      if (plano) {
        plano.fichas.push(ficha);
        await plano.save();
      } else {
        plano = await gymWorkoutPlan.create({
          userId: student.id,
          trainerId: trainer.id,
          fichas: [ficha],
        });
      }

      return res.status(201).json(plano);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  },

  async listarPorUsuario(req, res) {
    const userId = req.params.userID;
    try {
      const plano = await gymWorkoutPlan.findOne({ userId });
      if (!plano) return res.status(404).json({ error: 'Nenhuma ficha encontrada.' });
      return res.status(200).json(plano.fichas);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async excluirFicha(req, res) {
    try {
      const { userId, index } = req.params;
      const plano = await gymWorkoutPlan.findOne({ userId });
      if (!plano || !plano.fichas[index]) {
        return res.status(404).json({ error: 'Ficha não encontrada.' });
      }
      plano.fichas.splice(index, 1);
      await plano.save();
      return res.sendStatus(204);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async listarPorInstrutor(req, res) {
  try {
    const { trainerId } = req.params;

    const planos = await gymWorkoutPlan.find({ trainerId });

    const resultados = await Promise.all(planos.map(async plano => {
      const aluno = await User.findByPk(plano.userId);  // precisa do import: const { User } = require('../models')
      return {
        userId: plano.userId,
        nome: aluno?.name || "Desconhecido",
        email: aluno?.email || "Sem email",
        fichas: plano.fichas
      };
    }));

    res.status(200).json(resultados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
},

async buscarPorEmail (req, res) {
  try {
    const { email } = req.params;
    console.log("Buscando ficha para:", email); // 🔍 debug

    const user = await User.findOne({ where: { email } });
if (!user) {
  console.log("Usuário não encontrado.");
  return res.status(404).json({ error: "Usuário não encontrado." });
}

console.log("Usuário encontrado:", user.id); // <-- Aqui também

const plano = await gymWorkoutPlan.findOne({ userId: user.id });


    if (!plano) {
      console.log("Plano não encontrado.");
      return res.status(404).json({ error: "Nenhuma ficha encontrada para este aluno." });
    }

    res.json(plano);
  } catch (err) {
    console.error("Erro no backend:", err);
    res.status(500).json({ error: "Erro interno ao buscar ficha." });
  }
},

// Lista todos os alunos (nome e email) de um personal (trainerId)
async listarAlunosPorInstrutor(req, res) {
  const { trainerId } = req.params;

  try {
    const planos = await gymWorkoutPlan.find({ trainerId }).populate('userId', 'nome email');


    const alunos = planos.map(plano => ({
      nome: plano.userId?.nome || 'Desconhecido',
      email: plano.userId?.email || 'sem-email'
    }));

    res.json(alunos);
  } catch (error) {
    console.error("❌ Erro ao listar alunos do instrutor:", error);
    res.status(500).json({ error: 'Erro ao listar alunos do instrutor' });
  }
},




};

module.exports = gymWorkoutPlanController;
