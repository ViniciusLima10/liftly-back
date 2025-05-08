'use strict';

//quem está vinculado a academia e qual papel (aluno, adm, personal)

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

  // Definição das associações
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
