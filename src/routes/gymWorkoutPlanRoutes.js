const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const gymWorkoutPlanController = require('../controllers/gymWorkoutPlanController');
const GymWorkoutPlan = require('../models/mongo/gymWorkoutPlan'); 
const router = express.Router();

router.get('/user/:userID', gymWorkoutPlanController.listarPorUsuario);
router.get('/trainer/:trainerId', gymWorkoutPlanController.listarPorInstrutor);
router.get('/email/:email', gymWorkoutPlanController.buscarPorEmail);
router.get('/alunos/trainer/:trainerId', gymWorkoutPlanController.listarAlunosPorInstrutor);


router.use(authMiddleware);

router.post('/', gymWorkoutPlanController.criar);

// deletar ficha
router.delete('/:userId/:fichaIndex', async (req, res) => {
  const { userId, fichaIndex } = req.params;

  console.log("➡️ Requisição DELETE recebida:");
  console.log("userId:", userId);
  console.log("fichaIndex:", fichaIndex);

  try {
    const plano = await GymWorkoutPlan.findOne({ userId });

    if (!plano) {
      console.log("❌ Plano não encontrado");
      return res.status(404).json({ error: 'Plano não encontrado' });
    }

    const index = parseInt(fichaIndex, 10);
    if (isNaN(index) || index < 0 || index >= plano.fichas.length) {
      console.log("❌ Índice inválido:", fichaIndex);
      return res.status(400).json({ error: 'Índice da ficha inválido' });
    }

    plano.fichas.splice(index, 1);
    await plano.save();

    console.log("✅ Ficha deletada com sucesso");
    res.json({ message: 'Ficha removida com sucesso' });
  } catch (err) {
    console.error("❌ Erro ao deletar ficha:", err);
    res.status(500).json({ error: 'Erro ao deletar ficha' });
  }
});



module.exports = router;
