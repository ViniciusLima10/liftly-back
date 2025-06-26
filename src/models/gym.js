'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Gym = sequelize.define(
    'Gym',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: 'Deve ser um e-mail válido' },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'Gyms',
      timestamps: true,
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
    }
  );

  // Hash de senha antes de salvar
  Gym.beforeCreate(async (gym) => {
    if (gym.password) {
      gym.password = await bcrypt.hash(gym.password, 10);
    }
  });

  Gym.beforeUpdate(async (gym) => {
    if (gym.changed('password')) {
      gym.password = await bcrypt.hash(gym.password, 10);
    }
  });

  // Método de validação de senha
  Gym.prototype.validatePassword = async function (senhaPlain) {
    return bcrypt.compare(senhaPlain, this.password);
  };

  // Associações
  Gym.associate = function (models) {
    // Gym → Users (muitos para muitos via UserGyms)
    Gym.belongsToMany(models.User, {
      through: models.UserGym,   // Use o model direto para evitar erro de alias
      foreignKey: 'gymId',
      as: 'users',
    });

    // Gym → UserGym (um para muitos)
      Gym.hasMany(models.UserGym, {
        foreignKey: 'gymId',
        as: 'gymUserGyms'
    });

  };

  return Gym;
};
