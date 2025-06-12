const { Gym, User, UserGym } = require('../models'); // Adicionado User e UserGym
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
        // Aplica trim() aos campos string do req.body antes de atualizar
        const updateData = {};
        for (const key in req.body) {
            if (typeof req.body[key] === 'string') {
                updateData[key] = req.body[key].trim();
            } else {
                updateData[key] = req.body[key];
            }
        }
        await gym.update(updateData);
        res.json(gym);
    } catch (error) {
        console.error('Erro ao atualizar academia:', error);
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
        const gym = await Gym.scope(null).findOne({ where: { email: email.trim() } }); // Aplica trim
        if (!gym) {
            return res.status(404).json({ error: 'Academia não encontrada' });
        }

        const validPassword = await gym.validatePassword(password.trim()); // Aplica trim
        if (!validPassword) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        const payload = {
            sub: gym.id,
            name: gym.name,
            role: 'gym'
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        return res.status(200).json({ message: 'Login realizado com sucesso', token, gymId: gym.id, gymName: gym.name }); // Retorna gymId e gymName
    } catch (error) {
        console.error('Erro ao realizar login da academia:', error);
        return res.status(500).json({ error: 'Erro ao realizar login', details: error.message });
    }
};

const forgotPasswordGym = async (req, res) => {
    const { email } = req.body;
    const trimmedEmail = email ? email.trim() : null;

    try {
        const gym = await Gym.findOne({ where: { email: trimmedEmail } });

        if (!gym) return res.status(404).json({ error: 'Academia não encontrada' });

        const token = crypto.randomBytes(20).toString('hex');
        const expires = new Date(Date.now() + 3600000); // 1 hora

        await gym.update({
            resetToken: token,
            resetTokenExpires: expires
        });

        // Use o URL do FRONT-END aqui se a página de reset estiver no front
        const resetLink = `http://localhost:3000/reset-password-gym/${token}`;

        const mailOptions = {
            from: 'liftly.app@gmail.com',
            to: trimmedEmail,
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
        console.error('Erro ao solicitar redefinição de senha da academia:', error);
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

        const trimmedNewPassword = newPassword ? newPassword.trim() : null; // Aplica trim
        const hashedPassword = await bcrypt.hash(trimmedNewPassword, 10);

        await gym.update({
            password: hashedPassword,
            resetToken: null,
            resetTokenExpires: null
        });

        return res.status(200).json({ message: 'Senha atualizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao redefinir senha da academia:', error);
        res.status(500).json({ error: 'Erro ao redefinir senha', details: error.message });
    }
};

// ********************************************************************************
// NOVA FUNÇÃO: Cadastrar Personal Trainer/Aluno pela Academia (RF.13 e RF.21)
// ********************************************************************************
const registerUserByGym = async (req, res) => {
    try {
        // ID da academia logada (obtido do token JWT decodificado pelo authMiddleware)
        const gymId = req.user.gymId; // Supondo que o authMiddleware adicione o gymId ao req.user
                                     // Ou req.payload.sub se o sub do token for o gymId
        const gymRole = req.user.role; // Supondo que o authMiddleware adicione o role da academia

        // Verificação de Autorização: Apenas 'gym' (owner) pode cadastrar
        if (!gymId || gymRole !== 'gym') {
            return res.status(403).json({ error: 'Acesso negado. Apenas academias podem cadastrar usuários.' });
        }

        // Dados do usuário a ser cadastrado/associado (Personal Trainer ou Aluno)
        const { name, email, telefone, role } = req.body; // 'role' será 'teacher' ou 'student'

        // Aplica .trim() nos dados de entrada
        const trimmedName = name ? name.trim() : null;
        const trimmedEmail = email ? email.trim() : null;
        const trimmedTelefone = telefone ? telefone.trim() : null;

        if (!trimmedName || !trimmedEmail || !trimmedTelefone || !role) {
            return res.status(400).json({ error: 'Nome, e-mail, telefone e papel (role) são obrigatórios.' });
        }

        // 1. Encontrar ou Criar o Usuário na tabela 'Users'
        let user;
        const existingUser = await User.findOne({ where: { email: trimmedEmail } });

        if (existingUser) {
            user = existingUser;
            // Opcional: Atualizar dados do usuário se necessário (nome, telefone)
            await user.update({
                name: trimmedName,
                telefone: trimmedTelefone
            });
        } else {
            // Se o usuário não existe, precisa de uma senha.
            // Para cadastro de personal/aluno pela academia, podemos gerar uma senha temporária
            // e exigir que o usuário a redefina, ou ter um campo de senha no formulário da academia.
            // Por simplicidade, vamos gerar uma senha aleatória para o primeiro cadastro
            // e exigir redefinição (similar ao forgotPassword).
            const tempPassword = crypto.randomBytes(8).toString('hex'); // Senha temporária
            // O hash da senha será feito no hook beforeCreate do modelo User

            user = await User.create({
                name: trimmedName,
                email: trimmedEmail,
                password: tempPassword, // A senha será hashada pelo hook do modelo User
                telefone: trimmedTelefone,
                // Define as flags iniciais com base no 'role' fornecido
                isPersonal: (role === 'teacher'),
                isStudent: (role === 'student'),
                isNutritionist: false, // Pode ser ajustado se a academia cadastrar nutricionistas
                isOwner: false, // Pode ser ajustado
            });

            // Opcional: Enviar e-mail para o usuário com a senha temporária e link para redefinir
            // const resetToken = crypto.randomBytes(20).toString('hex');
            // const resetTokenExpires = new Date(Date.now() + 3600000);
            // await user.update({ resetToken, resetTokenExpires });
            // const resetLink = `http://localhost:3000/reset-password/${resetToken}`; // Link do front-end para o usuário
            // sendEmail(user.email, 'Sua Conta foi Criada!', `Sua senha temporária é: ${tempPassword}. Redefina aqui: ${resetLink}`);
            // console.log(`Senha temporária para ${user.email}: ${tempPassword}`); // Para depuração
        }

        // 2. Criar ou Encontrar a Associação na tabela 'UserGyms'
        // 'role' aqui é o papel do usuário DENTRO da academia ('professor' ou 'user')
        const userGymRole = (role === 'teacher' ? 'professor' : 'user'); // Mapeia 'teacher' para 'professor', 'student' para 'user'

        const [userGymAssociation, created] = await UserGym.findOrCreate({
            where: { userId: user.id, gymId: gymId },
            defaults: {
                role: userGymRole // O papel dentro da academia
            }
        });

        if (!created) {
            // Se a associação já existia, podemos atualizá-la ou apenas retornar
            await userGymAssociation.update({ role: userGymRole }); // Garante que o papel esteja atualizado
            return res.status(200).json({ message: `${trimmedName} já estava associado(a) a esta academia, papel atualizado para ${userGymRole}.`, user: user, userGym: userGymAssociation });
        }

        res.status(201).json({ message: `${trimmedName} cadastrado(a) e associado(a) à academia como ${userGymRole}!`, user: user, userGym: userGymAssociation });

    } catch (error) {
        console.error('Erro ao cadastrar/associar usuário à academia:', error);
        res.status(500).json({ error: 'Erro ao cadastrar/associar usuário à academia', details: error.message });
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
    resetPasswordGym,
    registerUserByGym // Exporta a nova função
};
