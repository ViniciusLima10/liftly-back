const dietPlan = require('../models/mongo/dietPlan');

const dietPlanController = {
    async criar(req, res){
        try{
            const dieta = await dietPlan.create(req.body);
            res.status(201).json(dieta);
        } catch (err) {
            res.status(500).json({ error: err.message});
        }
    },
    async  listarPorUsuario(req, res){
        const userId = parseInt(req.params.userID)
        try{
            const dieta = await dietPlan.find({ userId});
            res.status(201).json(dieta);
        } catch (err) {
            res.status(500).json({ error: err.message});
        }
    },

}

module.exports = dietPlanController;