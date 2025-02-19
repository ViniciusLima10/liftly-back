'use strict';

module.exports = (sequelize, DataTypes) => {
    const UserGym = sequelize.define(
      'UserGym',
      {
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
        gymId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'Gyms',
            key: 'id',
          },
        },
      },
      {
        primaryKey: ['userId', 'gymId'], // Define a chave primária como uma chave composta
      }
    );
  
  UserGym.associate = function (models) {
    models.User.belongsToMany(models.Gym, {
      through: UserGym,
      foreignKey: 'userId',
      as: 'userGyms',
    });

    models.Gym.belongsToMany(models.User, {
      through: UserGym,
      foreignKey: 'gymId',
      as: 'gymUsers',
    });
  };

  return UserGym;
};
