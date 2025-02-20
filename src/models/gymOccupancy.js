'use strict';

module.exports = (sequelize, DataTypes) => {
  const GymOccupancy = sequelize.define(
    'GymOccupancy',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      gymId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Gyms',
          key: 'id',
        },
      },
      currentOccupancy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      recordedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'GymOccupancy',
      timestamps: false, // Sem timestamps automáticos, pois o campo recordedAt será gerenciado manualmente.
    }
  );

  GymOccupancy.associate = function (models) {
    GymOccupancy.belongsTo(models.Gym, {
      foreignKey: 'gymId',
      as: 'gym',
      onDelete: 'CASCADE',
    });
  };

  return GymOccupancy;
};
