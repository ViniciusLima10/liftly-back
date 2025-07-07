

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
                return res
                    .status(400)
                    .json({ error: 'Usuário encontrado não é um aluno.' });
            }

            const trainer = await User.findByPk(trainerId);
            if (!trainer) {
                return res.status(404).json({ error: 'Instrutor não encontrado.' });
            }
            if (!trainer.isTrainer) {
                return res
                    .status(400)
                    .json({ error: 'Usuário encontrado não é um instrutor.' });
            }

            const plan = await gymWorkoutPlan.create({
                userId: student.id,
                trainerId: trainer.id,
                exercises,
            });

            return res.status(201).json(plan);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
    },


    async listarPorUsuario(req, res) {
        const userId = req.params.userID;
        try {
            const plans = await gymWorkoutPlan.find({ userId });
            return res.status(200).json(plans);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async listarPorInstrutor(req, res) {
        const trainerId = req.params.trainerId;
        try {
            const plans = await gymWorkoutPlan.find({ trainerId });
            return res.status(200).json(plans);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const updated = await gymWorkoutPlan.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            );
            if (!updated) {
                return res.status(404).json({ error: 'Plano não encontrado.' });
            }
            return res.json(updated);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async excluir(req, res) {
        try {
            const { id } = req.params;
            const deleted = await gymWorkoutPlan.findByIdAndDelete(id);
            if (!deleted) {
                return res.status(404).json({ error: 'Plano não encontrado.' });
            }
            return res.sendStatus(204);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
};

module.exports = gymWorkoutPlanController;