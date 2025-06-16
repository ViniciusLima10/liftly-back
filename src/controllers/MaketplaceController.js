// src/controllers/marketplaceController.js
const { MarketplaceService, User } = require('../models');

const getPersonals = async (req, res) => {
  try {
    const personals = await MarketplaceService.findAll({
      where: { role: 'teacher' },
      include: {
        model: User,
        as: 'provider',
        attributes: ['name']
      }
    });
    res.json(personals);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar personais", details: err.message });
  }
};

const getPersonal = async (req, res) => {
  try {
    let personal;
    const includeProvider = {
      model: User,
      as: 'provider',
      attributes: ['name']
    };

    if (req.params.id) {
      personal = await MarketplaceService.findByPk(req.params.id, {
        include: includeProvider
      });
    } else if (req.body.name) {
      personal = await MarketplaceService.findAll({
        where: { title: req.body.name },
        include: includeProvider
      });
    } else {
      return res.status(400).json({ error: "Erro ao buscar personal, por favor indique o nome ou o id!" });
    }

    res.json(personal);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar personal", details: err.message });
  }
};

const getNutritionists = async (req, res) => {
  try {
    const nutritionists = await MarketplaceService.findAll({
      where: { role: 'nutritionist' },
      include: {
        model: User,
        as: 'provider',
        attributes: ['name']
      }
    });
    res.json(nutritionists);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar nutricionistas", details: err.message });
  }
};

const getNutritionist = async (req, res) => {
  try {
    let nutritionist;
    const includeProvider = {
      model: User,
      as: 'provider',
      attributes: ['name']
    };

    if (req.params.id) {
      nutritionist = await MarketplaceService.findByPk(req.params.id, {
        include: includeProvider
      });
    } else if (req.body.name) {
      nutritionist = await MarketplaceService.findAll({
        where: { title: req.body.name },
        include: includeProvider
      });
    } else {
      return res.status(400).json({ error: "Erro ao buscar nutricionista, por favor indique o nome ou o id!" });
    }

    res.json(nutritionist);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar nutricionista", details: err.message });
  }
};

module.exports = {
  getPersonals,
  getPersonal,
  getNutritionists,
  getNutritionist
};
