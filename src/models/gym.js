'use strict';

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
      ownerId: {
        type: DataTypes.UUID,
        allowNull: true, // Permite que uma academia exista sem dono inicialmente
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'SET NULL', // Se o dono for removido, a academia continua existindo
      },
    },
    {
      tableName: 'Gyms',
      timestamps: true,
    }
  );

  Gym.associate = function (models) {
    Gym.belongsToMany(models.User, {
      through: 'UserGyms',
      foreignKey: 'gymId',
      as: 'users',
    });

    Gym.belongsTo(models.User, {
      foreignKey: 'ownerId',
      as: 'owner',
      onDelete: 'SET NULL',
    });
  };

  return Gym;
};
