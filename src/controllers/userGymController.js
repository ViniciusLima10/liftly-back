// src/controllers/userGymController.js
const { User, UserGym } = require('../models');
const crypto = require('crypto');

async function registerAndLinkUser(req, res) {
  try {
    console.log('↪️ registerAndLinkUser - req.user =', req.user);
    const gymId   = req.user.sub;
    const gymRole = req.user.role;
    console.log('   → gymId, gymRole =', gymId, gymRole);

    if (!gymId || gymRole !== 'gym') {
      return res.status(403).json({ error: 'Apenas academias podem registrar usuários.' });
    }

    const { name, email, telefone, role } = req.body;
    if (!name || !email || !telefone || !role) {
      return res.status(400).json({ error: 'Campos obrigatórios não informados.' });
    }

    // trim nos dados
    const trimmedEmail = email.trim();
    let user = await User.findOne({ where: { email: trimmedEmail } });

    if (user) {
      await user.update({ name: name.trim(), telefone: telefone.trim() });
    } else {
      const tempPassword = crypto.randomBytes(8).toString('hex');
      user = await User.create({
        name: name.trim(),
        email: trimmedEmail,
        telefone: telefone.trim(),
        password: tempPassword,
        isPersonal: role === 'teacher',
        isStudent:  role === 'student',
        isOwner:       false,
        isNutritionist:false,
      });
    }

    // aqui ajustamos para 'professor', que é o valor do seu ENUM no banco
    const userGymRole = role === 'teacher' ? 'professor' : 'user';

    console.log('➡️ Dados para vincular:', { userId: user.id, gymId, userGymRole });

    const [userGym, created] = await UserGym.findOrCreate({
      where: { userId: user.id, gymId },
      defaults: { role: userGymRole },
    });

    if (!created) {
      await userGym.update({ role: userGymRole });
    }

    return res.status(201).json({
      message: `${name} vinculado(a) à academia com sucesso.`,
      user,
      userGym,
    });

  } catch (err) {
    console.error('❌ registerAndLinkUser error:', err);
    return res.status(500).json({
      error:  'Erro ao registrar/associar usuário à academia',
      detail: err.message
    });
  }
}

async function getAllTrainersByGym(req, res) {
  console.log('↪️ getAllTrainersByGym chamado!');
  console.log('    req.user =', req.user);
  try {
    console.log('↪️ getAllTrainersByGym - req.user =', req.user);
    const gymId = req.user.sub;
    console.log('   → listando trainers para gymId =', gymId);

    const associations = await UserGym.findAll({
      where: { gymId, role: 'professor' },
      include: [{ model: User, as: 'user', attributes: ['id','name','email','telefone'] }]
    });

     return res.json(associations.map(a => a.user));

  } catch (err) {
    console.error('❌ getAllTrainersByGym error:', err);
    return res.status(500).json({ error: 'Erro ao listar personais', detail: err.message });
  }
}

async function getAllStudentsByGym(req, res) {
  console.log('↪️ getAllStudentsByGym chamado!');
  const gymId = req.user?.sub;

  try {
    const associations = await UserGym.findAll({
      where: { gymId, role: 'user' }, // ← alunos são 'user'
      include: [{ model: User, as:'user', attributes: ['id', 'name', 'email', 'telefone'] }]
    });

    return res.json(associations.map(a => a.user));

  } catch (err) {
    console.error('❌ getAllStudentsByGym error:', err);
    return res.status(500).json({ error: 'Erro ao listar alunos', detail: err.message });
  }
}

async function unlinkUserFromGym(req, res) {
  try {
    const gymId = req.user.sub;
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'ID do usuário não informado.' });
    }

    const userGym = await UserGym.findOne({ where: { userId, gymId } });

    if (!userGym) {
      return res.status(404).json({ error: 'Vínculo não encontrado.' });
    }

    await userGym.destroy();

    return res.status(200).json({ message: 'Usuário desvinculado da academia com sucesso.' });

  } catch (err) {
    console.error('❌ unlinkUserFromGym error:', err);
    return res.status(500).json({ error: 'Erro ao desvincular usuário da academia', detail: err.message });
  }
}
module.exports = {
  registerAndLinkUser,
  getAllTrainersByGym,
  getAllStudentsByGym,
  unlinkUserFromGym
};
