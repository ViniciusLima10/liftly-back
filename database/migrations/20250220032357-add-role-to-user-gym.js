'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('UserGyms', 'id', {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    });

    await queryInterface.addColumn('UserGyms', 'role', {
      type: Sequelize.ENUM('teacher', 'manager', 'user'),
      allowNull: false,
      defaultValue: 'user',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('UserGyms', 'role');
    await queryInterface.removeColumn('UserGyms', 'id');
  }
};
