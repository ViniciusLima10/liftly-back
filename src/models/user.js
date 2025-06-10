'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: { //nome do usuário
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: { //email do usuário
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: { //senha do usuário
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefone: { //telefone do usuário
        type: DataTypes.STRING,
        allowNull: false, 
      },
      altura: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      peso: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isStudent: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      isPersonal: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      isNutritionist: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      resetToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetTokenExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      profilePic: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM('aluno', 'personal', 'nutricionista', 'academia'),
        allowNull: true
        // defaultValue: 'aluno' // Opcional: define um valor padrão
      },
      idade: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      endereco: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ocupacaoMaxima: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('password') && user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
    }
  );

  User.associate = function (models) {
    User.belongsToMany(models.Gym, {
      through: 'UserGym',
      foreignKey: 'userId',
      as: 'gyms',
    });
  };

  User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
