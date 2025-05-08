const gymWorkoutPlan = require('../models/mongo/gymWorkoutPlan');

const gymWorkoutPlanController = {
    async criar(req, res){
        try{
            const ficha = await gymWorkoutPlan.create(req.body);
            res.status(201).json(ficha);
        } catch (err) {
            res.status(500).json({ error: err.message});
        }
    },
    async  listarPorUsuario(req, res){
        console.log(req.params)
        const userId = parseInt(req.params.userID)
        console.log(userId)
        try{
            const ficha = await gymWorkoutPlan.find({ userId});
            res.status(201).json(ficha);
        } catch (err) {
            res.status(500).json({ error: err.message});
        }
    },

}

module.exports = gymWorkoutPlanController;