'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserGym = sequelize.define(
    'UserGym',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
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
      role: {
        type: DataTypes.ENUM('professor', 'manager', 'user'),
        allowNull: false,
        defaultValue: 'user',
      },
    },
    {
      tableName: 'UserGyms',
      timestamps: true,
    }
  );

  UserGym.associate = function (models) {
    // Associa cada UserGym a um usuário
    UserGym.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });

    // Associa cada UserGym a uma academia
    UserGym.belongsTo(models.Gym, {
      foreignKey: 'gymId',
      as: 'gym'
    });
  };

  return UserGym;
};
