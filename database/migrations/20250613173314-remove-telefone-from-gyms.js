'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Gyms', 'telefone');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Gyms', 'telefone', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
