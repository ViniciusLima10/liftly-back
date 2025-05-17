'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'isStudent', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    })

    await queryInterface.addColumn('Users', 'isPersonal', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    })

    await queryInterface.addColumn('Users', 'isNutritionist', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    })

    await queryInterface.removeColumn('Users', 'role');

  },

  async down (queryInterface, Sequelize) {
  }
};
