'use strict';
//relaciona um usuario a uma aula
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    'Schedule',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: { //id do aluno
        type: DataTypes.UUID,
        allowNull: false,
      },
      classId: { //id da aula
        type: DataTypes.UUID,
        allowNull: false,
      },
      scheduledAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Confirmado',
      },
    },
    {
      tableName: 'Schedules',
      timestamps: true,
    }
  );

  // Associações
  Schedule.associate = (models) => {
    Schedule.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });

    Schedule.belongsTo(models.Class, {
      foreignKey: 'classId',
      as: 'class',
      onDelete: 'CASCADE',
    });
  };

  return Schedule;
};
