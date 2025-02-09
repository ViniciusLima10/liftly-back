'use strict';
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    'Class',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      gymId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      instructor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maxCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'Classes',
      timestamps: true,
    }
  );

  // Associações
  Class.associate = (models) => {
    Class.belongsTo(models.Gym, {
      foreignKey: 'gymId',
      as: 'gym',
      onDelete: 'CASCADE',
    });
  };

  return Class;
};
