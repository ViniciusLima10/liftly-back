const { User } = require("../models");
const gymWorkoutPlan = require('../models/mongo/gymWorkoutPlan');


const createPlan = async (req, res) => {
    try {
        const user = await User.findOne({where: {email: req.body.email}});
        if(!user) return res.status(500).json({error: "Usuario nao encontrado"});

        await gymWorkoutPlan.create({
            id: user.id,
            fichas: req.body.fichas
        })
        user.id
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar plano de treino', details: error.message });
    }
}



module.exports = { createPlan}