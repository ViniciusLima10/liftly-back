const { Gym, User, UserGym } = require('../models');


async function linkUserGym(req, res) {
  const { userEmail, gymEmail, role } = req.body;

  try {

    const user = await User.findOne({ where: { email: userEmail } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const gym = await Gym.findOne({ where: { email: gymEmail } });
    if (!gym) {
      return res.status(404).json({ message: 'Academia não encontrada' });
    }

    const [novoVinculo, created] = await UserGym.findOrCreate({
      where: { userId: user.id, gymId: gym.id, role },
      defaults: { userId: user.id, gymId: gym.id, role }
    });

    if (!created) {
      return res.status(400).json({
        message: 'Vínculo já existe para esse papel nesta academia'
      });
    }

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
