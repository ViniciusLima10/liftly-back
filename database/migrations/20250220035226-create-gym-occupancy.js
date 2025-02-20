'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('GymOccupancy', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
      },
      gymId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Gyms',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      currentOccupancy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      recordedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('GymOccupancy');
  },
};
