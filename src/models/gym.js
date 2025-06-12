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
        field: 'password',
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

  Gym.prototype.validatePassword = async function (senhaPlain) {
    return bcrypt.compare(senhaPlain, this.password);
  };

  Gym.associate = function (models) {
    Gym.belongsToMany(models.User, {
      through: 'UserGyms',
      foreignKey: 'gymId',
      as: 'users',
    });
  };

  return Gym;
};
