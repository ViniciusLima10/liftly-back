'use strict';

module.exports = (sequelize, DataTypes) => {
  const ServiceRequest = sequelize.define('ServiceRequest', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    studentId: { //aluno que está contratando
      type: DataTypes.UUID,
      allowNull: false,
    },
    serviceId: { //serviço que ele contratou
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: { //status do pedido
      type: DataTypes.ENUM('pending', 'approved', 'rejected', 'completed'),
      defaultValue: 'pending',
    },
  }, {
    tableName: 'ServiceRequests',
    timestamps: true,
  });

  ServiceRequest.associate = (models) => {
    ServiceRequest.belongsTo(models.User, {
      foreignKey: 'studentId',
      as: 'student',
      onDelete: 'CASCADE',
    });

    ServiceRequest.belongsTo(models.MarketplaceService, {
      foreignKey: 'serviceId',
      as: 'service',
      onDelete: 'CASCADE',
    });
  };

  return ServiceRequest;
};
