'use strict';

module.exports = (sequelize, DataTypes) => {
  const MarketplaceService = sequelize.define('MarketplaceService', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    providerId: { // pode ter nutricionista ou personal
      type: DataTypes.UUID,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('teacher', 'nutritionist'),
      allowNull: false,
    },
    title: { //nome do serviço - ex: dieta para emagrecimento
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: { //descrição do serviço a ser oferecido
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: { //valor do serviço
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    available: { //se está disponivel ou não
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'MarketplaceServices',
    timestamps: true,
  });

  MarketplaceService.associate = (models) => {
    MarketplaceService.belongsTo(models.User, {
      foreignKey: 'providerId',
      as: 'provider',
      onDelete: 'CASCADE',
    });
  };

  return MarketplaceService;
};
