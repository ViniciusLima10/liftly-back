const mongoose = require('mongoose');

const alimentosSchema = new mongoose.Schema({
    nome: String,
    quantidade: Number,
    modoDePreparo: String,
    carboidrato: Number,
    proteina: Number,
    gordura: Number
}, { _id: false});

const refeicoesSchema = new mongoose.Schema({
    nomeRefeicao: {
        type: String,
        required: true,
    },
    horario: {
        type: String,
        required: true
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    },
    alimentos: [alimentosSchema]
}, {_id: false});

const dietPlanSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    nutritionistId: { type: String, required: true },
    refeicoes: [refeicoesSchema]
})


module.exports = mongoose.model('dietPlan', dietPlanSchema)