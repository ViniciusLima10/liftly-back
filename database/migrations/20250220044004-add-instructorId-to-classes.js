'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Classes', 'instructorId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });

    await queryInterface.removeColumn('Classes', 'instructor');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Classes', 'instructor', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.removeColumn('Classes', 'instructorId');
  }
};
