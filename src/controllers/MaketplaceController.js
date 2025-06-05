const {MarketplaceService} = require('../models');

const  getPersonals = async (req, res) =>{
    try {
        const personals = await MarketplaceService.findAll();
            res.json(personals);
    } catch (err) {
        res.status(500).json({error: "Erro ao buscar personais", details: err.message});
    }
}

const getPersonal = async (req, res) => {
    try {
        let personal;
        if(req.params.id) {
            personal = await MarketplaceService.findByPk(req.params.id);

        } else if (req.body.name) {
            personal = await MarketplaceService.findAll({where: {name: req.body.name}})

        } else {
           return res.status(500).json({error: "Erro ao buscar personal, por favor indique o nome ou o id!"});
        }

        res.json(personal);

    } catch (err) {
        res.status(500).json({error: "Erro ao buscar personal", details: err.message});
    }
}

const  getNutritionists = async (req, res) =>{
    try {
        const nutricionists = await MarketplaceService.findAll();
            res.json(nutricionists);
    } catch (err) {
        res.status(500).json({error: "Erro ao buscar nutricionista", details: err.message});
    }
}

const getNutritionist = async (req, res) => {
    try {
        let nutricionist;
        if(req.params.id) {
            nutricionist = await MarketplaceService.findByPk(req.params.id);

        } else if (req.body.name) {
            nutricionist = await MarketplaceService.findAll({where: {name: req.body.name}})

        } else {
           return res.status(500).json({error: "Erro ao buscar nutricionista, por favor indique o nome ou o id!"});
        }

        res.json(personal);

    } catch (err) {
        res.status(500).json({error: "Erro ao buscar nutricionista", details: err.message});
    }
}




module.exports = {getPersonals, getPersonal, getNutritionists, getNutritionist}