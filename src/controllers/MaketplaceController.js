// src/controllers/marketplaceController.js
const { MarketplaceService, User } = require('../models');

// Função para buscar todos os personais
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

// Função para buscar um personal por ID ou nome
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

// Função para buscar todos os nutricionistas
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

// Função para buscar um nutricionista por ID ou nome
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

// Função para criar um serviço (somente um serviço por providerId)
const createService = async (req, res) => {
  try {
    const { providerId } = req.params;  // providerId vem da URL
    const { role, title, description, price } = req.body;

    // Validações simples
    if (!providerId || !role || !title || !price) {
      return res.status(400).json({ error: "Faltam dados obrigatórios: providerId, role, title, price." });
    }

    // Verificando se já existe um serviço para esse providerId
    const existingService = await MarketplaceService.findOne({ where: { providerId } });

    if (existingService) {
      return res.status(400).json({ error: "Já existe um serviço cadastrado para esse providerId." });
    }

    // Criando o serviço no banco
    const newService = await MarketplaceService.create({
      providerId,
      role,
      title,
      description,
      price,
      available: true,  // sempre true, conforme solicitado
    });

    // Respondendo com o serviço criado
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ error: "Erro ao cadastrar serviço", details: err.message });
  }
};

// Função para deletar um serviço
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;  // Pega o ID do serviço a partir da URL

    // Verificando se o serviço existe
    const service = await MarketplaceService.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: "Serviço não encontrado!" });
    }

    // Deletando o serviço
    await service.destroy();

    res.status(200).json({ message: "Serviço removido com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao remover serviço", details: err.message });
  }
};

// Função para obter o serviço cadastrado para um providerId
const getServiceByProviderId = async (req, res) => {
  try {
    const { providerId } = req.params;  // providerId vem da URL

    // Buscando o serviço para esse providerId
    const service = await MarketplaceService.findOne({
      where: { providerId },
      include: {
        model: User,
        as: 'provider',
        attributes: ['name', 'idade']
      }
    });

    if (!service) {
      return res.status(404).json({ error: "Serviço não encontrado para esse providerId!" });
    }

    // Retornando o serviço encontrado
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar serviço", details: err.message });
  }
};

module.exports = {
  getPersonals,
  getPersonal,
  getNutritionists,
  getNutritionist,
  createService,
  deleteService,
  getServiceByProviderId  // Adicionando o novo controlador
};
