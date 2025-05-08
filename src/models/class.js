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
        references: {
          model: 'Gyms',
          key: 'id',
        },
      },
      name: { //nome da aula
        type: DataTypes.STRING,
        allowNull: false,
      },
      instructorId: { //nome do professor
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',  
          key: 'id',
        },
      },
      startTime: { //horário de inicio da aula
        type: DataTypes.DATE,
        allowNull: false,
      },
      duration: { //duração da aula
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maxCapacity: {  //máxima capacidade de alunos
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

    Class.belongsTo(models.User, {
      foreignKey: 'instructorId', // Associação do professor à classe
      as: 'instructor',
      onDelete: 'CASCADE',
    });
  };

  return Class;
};
