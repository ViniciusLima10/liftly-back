const { Gym } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '8h';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_EMAIL_SENHA
  }
});

const createGym = async (req, res) => {
  try {
    const gym = await Gym.create(req.body);
    res.status(201).json(gym);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar academia', details: error.message });
  }
};

const getGyms = async (req, res) => {
  try {
    const gyms = await Gym.findAll();
    res.json(gyms);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar academias', details: error.message });
  }
};

const getGymById = async (req, res) => {
  try {
    const gym = await Gym.findByPk(req.params.id);
    if (!gym) {
      return res.status(404).json({ error: 'Academia não encontrada' });
    }
    res.json(gym);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar academia', details: error.message });
  }
};

const updateGym = async (req, res) => {
  try {
    const gym = await Gym.findByPk(req.params.id);
    if (!gym) {
      return res.status(404).json({ error: 'Academia não encontrada' });
    }
    await gym.update(req.body);
    res.json(gym);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar academia', details: error.message });
  }
};

const deleteGym = async (req, res) => {
  try {
    const gym = await Gym.findByPk(req.params.id);
    if (!gym) {
      return res.status(404).json({ error: 'Academia não encontrada' });
    }
    await gym.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover academia', details: error.message });
  }
};

const loginGym = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
  }

  try {
    const gym = await Gym.scope(null).findOne({ where: { email } });
    if (!gym) {
      return res.status(404).json({ error: 'Academia não encontrada' });
    }

    const validPassword = await gym.validatePassword(password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const payload = {
      sub: gym.id,
      name: gym.name,
      role: 'gym'
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.status(200).json({ message: 'Login realizado com sucesso', token });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao realizar login', details: error.message });
  }
};

const forgotPasswordGym = async (req, res) => {
  const { email } = req.body;

  try {
    const gym = await Gym.findOne({ where: { email } });

    if (!gym) return res.status(404).json({ error: 'Academia não encontrada' });

    const token = crypto.randomBytes(20).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 hora

    await gym.update({
      resetToken: token,
      resetTokenExpires: expires
    });

    const resetLink = `http://localhost:3001/gyms/reset-password/${token}`;

    const mailOptions = {
      from: 'liftly.app@gmail.com',
      to: email,
      subject: 'Redefinição de Senha - Academia',
      html: `
        <h2>Redefinição de senha</h2>
        <p>Olá, você solicitou a redefinição da senha da sua academia.</p>
        <p>Clique no link abaixo para criar uma nova senha. Esse link expira em 1 hora:</p>
        <a href="${resetLink}">${resetLink}</a>
      `
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Erro ao enviar e-mail:', err.message);
        return res.status(500).json({ error: 'Erro ao enviar o e-mail' });
      } else {
        console.log('E-mail enviado:', info.response);
        return res.status(200).json({ message: 'E-mail enviado com instruções para redefinir a senha' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao solicitar redefinição de senha', details: error.message });
  }
};

const resetPasswordGym = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const gym = await Gym.findOne({
      where: {
        resetToken: token,
        resetTokenExpires: { [Op.gt]: new Date() }
      }
    });

    if (!gym) return res.status(400).json({ error: 'Token expirado ou inválido' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await gym.update({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpires: null
    });

    return res.status(200).json({ message: 'Senha atualizada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao redefinir senha', details: error.message });
  }
};

module.exports = {
  createGym,
  getGyms,
  getGymById,
  updateGym,
  deleteGym,
  loginGym,
  forgotPasswordGym,
  resetPasswordGym
};
