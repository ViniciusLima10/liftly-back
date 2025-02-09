'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Valida se o email está no formato correto
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false, // Remove a validação de comprimento
      },
      telefone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      altura: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      peso: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      hooks: {
        // Hook para hash antes de criar o usuário
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
        // Hook para hash antes de atualizar o campo password
        beforeUpdate: async (user) => {
          if (user.changed('password') && user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
    }
  );

  // Método para validar a senha
  User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
