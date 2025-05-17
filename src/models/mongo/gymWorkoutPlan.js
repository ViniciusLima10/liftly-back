const mongoose = require('mongoose');

const ExercicioSchema = new mongoose.Schema({
    nome: String,
    series: Number,
    repeticoes: String,
    carga: String,
    descanso: String,
    observacoes: String
}, { _id: false});

const FichasSchema = new mongoose.Schema({
    nomeFicha: {
        type: String,
        required: true,
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    },
    exercicios: [ExercicioSchema]
}, {_id: false});

const gymWorkoutPlanSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    fichas: [FichasSchema]
})


module.exports = mongoose.model('gymWorkoutPlan', gymWorkoutPlanSchema)