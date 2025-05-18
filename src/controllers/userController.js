const { User } = require('../models');
const { generateToken } = require('../utils/jwt');
const dietPlan = require('../models/mongo/dietPlan');
const workoutPlan = require('../models/mongo/gymWorkoutPlan');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');
require('dotenv').config();
const path = require('path');




const createUser = async (req, res) => {
  try {
    const { name, email, password, telefone, altura, peso, isNutritionist, isPersonal, isStudent } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'E-mail já cadastrado.' });
    }

    const user = await User.create({
      name,
      email,
      password,
      telefone,
      altura,
      peso,
      isStudent,
      isNutritionist,
      isPersonal
    });

    const token = generateToken({ id: user.id, email: user.email });

    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
  }
};

// Listar todos os usuários
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários', details: error.message });
  }
};

// Buscar usuário por ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário', details: error.message });
  }
};

// Atualizar usuário por ID
const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário', details: error.message });
  }
};

// Remover usuário por ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover usuário', details: error.message });
  }
};

const findUserDietPlans = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const dietas = await dietPlan.find({ userId });

    if (!dietas || dietas.length === 0) {
      return res.status(204).send(); 
    }

    return res.status(200).json(dietas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao achar planos de dieta do usuário', details: error.message });
  }
};

const findUserWorkoutPlans = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const workoutplans = await workoutPlan.find({ userId });

    if (!workoutplans || workoutplans.length === 0) {
      return res.status(204).send();
    }

    return res.status(200).json(workoutplans);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao achar planos de treino do usuário', details: error.message });
  }
};

const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body; 
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    const token = generateToken({ id: user.id, email: user.email });

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        tipo: user.role
      },
      token
    });

  } catch (error) {
    res.status(500).json({ error: 'Erro no login', details: error.message });
  }
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_EMAIL_SENHA
  }
})

const forgotPassword = async(req, res) => {
  const {email} = req.body;

  const user = await User.findOne({where: {email}});

  if(!user) return res.status(404).json({error: "Usuario nao encontrado"});

  const token = crypto.randomBytes(20).toString('hex');
  const expires = new Date(Date.now() + 3600000) // 1hr

  await user.update ({
    resetToken: token,
    resetTokenExpires: expires,
  });

  const resetLink = `http://localhost:3001/users/reset-password/${token}`

  const mailOptions = {
    from: "liflty.app@gmail.com",
    to: email,
    subject: 'Redefinição de Senha',
    html: `
    <h2>Redefinição de senha</h2>
    <p>Olá, você solicitou a redefinição de senha.</p>
    <p>Clique no link abaixo para criar uma nova senha. Esse link expira em 1 hora:</p>
    <a href="${resetLink}">${resetLink}</a>
  `
  };

  transporter.sendMail(mailOptions, (err, info)=> {
    if (err) {
      console.error("Erro ao enviar email: " + err.message);
      return res.status(500).json({error: "Erro ao enviar o e-mail"});
    }else{
      console.log("email enviado: " + info.response);
      return res.status(200).json({message: 'E-mail enviado com instruções para redefinir a senha' })
    }
  })
  
}

const resetPassword = async(req, res) => {

  const { token } = req.params;
  const {newPassword} = req.body;

  const user = await User.findOne({
    where: {
      resetToken: token,
      resetTokenExpires: { [Op.gt]: new Date() } // ainda valido
    }
  });

  if(!user) return res.status(400).json({error: "Token expirado ou invalido"});

  const hasedPassword = await bcrypt.hash(newPassword, 10);

  await user.update({
    password: hasedPassword,
    resetToken: null,
    resetTokenExpires: null
  }
  )

  return res.status(200).json({ message: "senha atualizada com sucesso!"})
}

const uploadProfilePic = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if(!user) return res.status(404).json({error: "usuario nao encontrado"});

    if(!req.file) return res.status(404).json({error: "nenhuma imagem foi enviada"});

    const imagePath = path.join('uploads/profilePics', req.file.filename);

    await user.update({ profilePic: imagePath});

    res.status(200).json({message: "Imagem de perfil atualizada", profilePic: imagePath});  
  } catch(err) {
    res.status(500).json({error: "Erro ao atualizar foto de perfil", details: err.message})

  }
}

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser, findUserWorkoutPlans,  findUserDietPlans, resetPassword, forgotPassword, uploadProfilePic};
