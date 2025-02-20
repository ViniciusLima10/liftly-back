require('dotenv').config({ path: '../../.env' });

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,       // Nome do banco
  process.env.DB_USER,       // Usuário
  process.env.DB_PASSWORD,   // Senha
  {
    host: process.env.DB_HOST,   // Host (pode ser o container)
    port: process.env.DB_PORT,   // Porta
    dialect: 'postgres',         // Dialeto
    logging: false,              // Desativa logs de SQL no console
  }
);

module.exports = sequelize;
