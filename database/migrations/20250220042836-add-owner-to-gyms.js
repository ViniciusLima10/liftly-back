'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Gyms', 'ownerId', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'SET NULL', // Se o dono for removido, a academia continua existindo
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Gyms', 'ownerId');
  },
};
