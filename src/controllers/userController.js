const { User } = require('../models'); // Certifique-se que User é o seu modelo
const { generateToken } = require('../utils/jwt');
const dietPlan = require('../models/mongo/dietPlan'); // Para modelos MongoDB
const workoutPlan = require('../models/mongo/gymWorkoutPlan'); // Para modelos MongoDB
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize'); // Usado para operações do Sequelize
require('dotenv').config();
const path = require('path');

<<<<<<< HEAD

// Função para criar usuário - AGORA COM .trim() E LÓGICA DE ROLES AJUSTADA
const createUser = async (req, res) => {
    try {
        // Extrai o 'role' da URL (que vem de /cadastro/:role)
        const { role } = req.params;

        // Extrai os dados básicos do corpo da requisição e aplica .trim()
        const { name, email, password, telefone, altura, peso, descricao, endereco, ocupacaoMaxima } = req.body;

=======
// Função para criar usuário - AGORA COM .trim() E LÓGICA DE ROLES AJUSTADA
const createUser = async (req, res) => {
  try {
        const { role } = req.params;
        const { name, email, password, telefone, altura, peso, descricao, endereco, ocupacaoMaxima } = req.body;

>>>>>>> 9c679bf (fix)
        // Aplica .trim() em todos os campos de string relevantes imediatamente
        const trimmedName = name ? name.trim() : null; // Lida com nome opcional
        const trimmedEmail = email ? email.trim() : null;
        const trimmedPassword = password ? password.trim() : null; // Senha deve ser tratada como string
        const trimmedTelefone = telefone ? telefone.trim() : null; // Telefone é string

        // Validação inicial para campos obrigatórios (após trim)
        if (!trimmedName || !trimmedEmail || !trimmedPassword) {
            return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios.' });
        }

        // HASHEIA A SENHA ANTES DE TUDO
        const hashedPassword = await bcrypt.hash(trimmedPassword, 10); // Usa a senha já "trimada"

        // Verifica se o e-mail já existe
        const existingUser = await User.findOne({ where: { email: trimmedEmail } }); // Compara com e-mail "trimado"
        if (existingUser) {
            return res.status(409).json({ error: 'E-mail já cadastrado.' });
        }

        // Prepara o objeto de dados do usuário
        let userFields = {
            name: trimmedName,
            email: trimmedEmail,
            password: hashedPassword, // Usa a senha já hashed
            telefone: trimmedTelefone, // Telefone tratado aqui, será null se não enviado/preenchido

            // Inicializa todas as flags de role como false
            isStudent: false,
            isNutritionist: false,
            isPersonal: false,
            isOwner: false, // Adicione esta flag se seu modelo User tiver um campo para donos de academia
<<<<<<< HEAD
            // profilePic: req.body.profilePic, // Se você quiser permitir upload no cadastro inicial
=======
>>>>>>> 9c679bf (fix)
        };

        // Adiciona campos específicos e define as flags de role com base no 'role' da URL
        switch (role) {
            case 'student':
                userFields.isStudent = true;
                userFields.peso = peso; // Assume que peso/altura são números, não precisam de .trim()
                userFields.altura = altura;
                break;
            case 'teacher':
                userFields.isPersonal = true; // Assumindo 'isPersonal' para Personal Trainer
                userFields.descricao = descricao ? descricao.trim() : null; // Descrição é string
<<<<<<< HEAD
                // Se 'idade' for um campo para teacher/nutritionist, adicione aqui (assumindo numérico)
                // userFields.idade = req.body.idade;
=======
>>>>>>> 9c679bf (fix)
                break;
            case 'owner':
                userFields.isOwner = true; // Usar esta flag se houver um campo 'isOwner' no seu modelo User
                userFields.endereco = endereco ? endereco.trim() : null; // Endereço é string
                userFields.ocupacaoMaxima = ocupacaoMaxima; // Assume numérico
                break;
            case 'nutritionist':
                userFields.isNutritionist = true;
                userFields.descricao = descricao ? descricao.trim() : null;
<<<<<<< HEAD
                // Se 'idade' for um campo para teacher/nutritionist, adicione aqui
                // userFields.idade = req.body.idade;
=======
>>>>>>> 9c679bf (fix)
                break;
            default:
                // Se o role não for reconhecido, retorna um erro 400
                return res.status(400).json({ error: 'Tipo de usuário inválido.' });
        }

        // Cria o usuário no banco de dados com os campos preparados
        const user = await User.create(userFields);

        // Gera e retorna o token JWT
        const token = generateToken({ id: user.id, email: user.email, role: role }); // Inclua o role no token se precisar

        res.status(201).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: role // Retorna o role string para o front-end
            },
            token
        });

    } catch (error) {
        // Loga o erro completo para depuração
        console.error('Erro detalhado ao criar usuário:', error);
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
        // Aplica trim() aos campos string do req.body antes de atualizar
        const updateData = {};
        for (const key in req.body) {
            if (typeof req.body[key] === 'string') {
                updateData[key] = req.body[key].trim();
            } else {
                updateData[key] = req.body[key];
            }
        }
        await user.update(updateData); // CUIDADO: req.body pode incluir a senha em texto claro. Idealmente, trate atualizações de senha separadamente.
        res.json(user);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
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
        res.status(204).send(); // 204 No Content para remoção bem-sucedida
    } catch (error) {
        console.error('Erro ao remover usuário:', error);
        res.status(500).json({ error: 'Erro ao remover usuário', details: error.message });
    }
};

// Buscar planos de dieta de um usuário (MongoDB)
const findUserDietPlans = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ error: 'ID de usuário não fornecido.' }); // Mudado de 404 para 400
        }

        const dietas = await dietPlan.find({ userId });

        if (!dietas || dietas.length === 0) {
            return res.status(204).send(); // 204 No Content se não houver dietas
        }

        return res.status(200).json(dietas);
    } catch (error) {
        console.error('Erro ao achar planos de dieta do usuário:', error);
        res.status(500).json({ error: 'Erro ao achar planos de dieta do usuário', details: error.message });
    }
};

// Buscar planos de treino de um usuário (MongoDB)
const findUserWorkoutPlans = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ error: 'ID de usuário não fornecido.' }); // Mudado de 404 para 400
        }

        const workoutplans = await workoutPlan.find({ userId });

        if (!workoutplans || workoutplans.length === 0) {
            return res.status(204).send(); // 204 No Content se não houver planos
        }

        return res.status(200).json(workoutplans);
    } catch (error) {
        console.error('Erro ao achar planos de treino do usuário:', error);
        res.status(500).json({ error: 'Erro ao achar planos de treino do usuário', details: error.message });
    }
};

// Função de login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Aplica .trim() nos campos de login também
        const trimmedEmail = email ? email.trim() : null;
        const trimmedPassword = password ? password.trim() : null;

        const user = await User.findOne({ where: { email: trimmedEmail } }); // Compara com e-mail "trimado"
        if (!user) {
            console.log('Usuário não encontrado para E-mail:', trimmedEmail);
            return res.status(401).json({ error: 'Usuário não encontrado.' });
        }
        console.log('Usuário encontrado. Senha hashada no DB:', user.password);

        // Compara a senha "trimada" com o hash do DB
        const passwordMatch = await bcrypt.compare(trimmedPassword, user.password);
        console.log('Resultado da comparação de senha (bcrypt.compare):', passwordMatch); // DEVE SER TRUE PARA SUCESSO

        if (!passwordMatch) {
            console.log('Senha incorreta para E-mail:', trimmedEmail);
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        const token = generateToken({ id: user.id, email: user.email, tipo: user.role }); // Use user.role ou role, dependendo de como você mapeia
        console.log('Token gerado:', token);

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
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro no login', details: error.message });
    }
};

// Configuração do Nodemailer para envio de e-mails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_EMAIL_SENHA
    }
});

// Função para solicitar redefinição de senha
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const trimmedEmail = email ? email.trim() : null; // Aplica trim

    const user = await User.findOne({ where: { email: trimmedEmail } }); // Compara com e-mail "trimado"

    if (!user) return res.status(404).json({ error: "Usuario nao encontrado" });

    // Gera um token de redefinição único
    const token = crypto.randomBytes(20).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 hora de expiração

    // Atualiza o usuário com o token e a expiração
    await user.update({
        resetToken: token,
        resetTokenExpires: expires,
    });

    // Link de redefinição que o usuário receberá por e-mail
    const resetLink = `http://localhost:3000/reset-password/${token}`; // Certifique-se que este é o URL correto do seu FRONT-END

    const mailOptions = {
        from: "liflty.app@gmail.com",
        to: trimmedEmail, // Envia para o e-mail "trimado"
        subject: 'Redefinição de Senha',
        html: `
        <h2>Redefinição de senha</h2>
        <p>Olá, você solicitou a redefinição de senha.</p>
        <p>Clique no link abaixo para criar uma nova senha. Esse link expira em 1 hora:</p>
        <a href="${resetLink}">${resetLink}</a>
      `
    };

    // Envia o e-mail
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error("Erro ao enviar email: " + err.message);
            return res.status(500).json({ error: "Erro ao enviar o e-mail" });
        } else {
            console.log("Email enviado: " + info.response);
            return res.status(200).json({ message: 'E-mail enviado com instruções para redefinir a senha' });
        }
    });
};

// Função para redefinir a senha (usada após clicar no link do e-mail)
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
        where: {
            resetToken: token,
            resetTokenExpires: { [Op.gt]: new Date() } // [Op.gt] significa "maior que" (ainda não expirou)
        }
    });

    if (!user) return res.status(400).json({ error: "Token expirado ou invalido" });

    // Hasheia a nova senha "trimada" antes de salvar
    const trimmedNewPassword = newPassword ? newPassword.trim() : null;
    const hashedPassword = await bcrypt.hash(trimmedNewPassword, 10);

    // Atualiza a senha e limpa os tokens de redefinição
    await user.update({
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null
    });

    return res.status(200).json({ message: "Senha atualizada com sucesso!" });
};

// Função para upload de foto de perfil
const uploadProfilePic = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) return res.status(404).json({ error: "usuario nao encontrado" });

        if (!req.file) return res.status(400).json({ error: "Nenhuma imagem foi enviada." }); // Mudado de 404 para 400

        // Certifique-se de que o diretório 'uploads/profilePics' existe no seu servidor
        const imagePath = path.join('uploads/profilePics', req.file.filename);

        await user.update({ profilePic: imagePath });

        res.status(200).json({ message: "Imagem de perfil atualizada", profilePic: imagePath });
    } catch (err) {
        console.error('Erro ao atualizar foto de perfil:', err);
        res.status(500).json({ error: "Erro ao atualizar foto de perfil", details: err.message });
    }
};

// Exporta todas as funções do controlador
module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
    findUserWorkoutPlans,
    findUserDietPlans,
    resetPassword,
    forgotPassword,
    uploadProfilePic
};