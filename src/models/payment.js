// src/models/payment.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.Subscription, {
        foreignKey: 'subscriptionId',
        as: 'subscription'
      });
    }
  }

  Payment.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    subscriptionId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pendente', 'pago', 'atrasado', 'cancelado'),
      allowNull: false,
      defaultValue: 'pendente',
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    method: {
      type: DataTypes.ENUM('dinheiro', 'pix', 'cartao', 'boleto'),
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Payment',
    tableName: 'Payments',
    timestamps: true,
  });

  return Payment;
};
