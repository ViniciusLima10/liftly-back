'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
      },
      subscriptionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Subscriptions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pendente', 'pago', 'atrasado', 'cancelado'),
        allowNull: false,
        defaultValue: 'pendente',
      },
      dueDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      paymentDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      method: {
        type: Sequelize.ENUM('dinheiro', 'pix', 'cartao', 'boleto'),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payments');
  },
};
