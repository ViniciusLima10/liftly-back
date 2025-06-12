const { UserGym } = require('../models');

async function linkUserGym(req, res) {
  const { userId, gymId, role } = req.body;

  try {
    const novoVinculo = await UserGym.create({ userId, gymId, role });
    return res.status(201).json({
      message: 'Usuário vinculado com sucesso',
      data: novoVinculo
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message: 'Erro ao vincular usuário',
      error: err.message
    });
  }
}

module.exports = { linkUserGym };
