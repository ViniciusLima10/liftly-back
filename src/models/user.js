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
      role: {
        type: DataTypes.ENUM('student', 'teacher', 'owner', 'nutritionist'),
        allowNull: false,
        defaultValue: 'student',
      },
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
