module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Classes', 'dayOfWeek', {
      type: Sequelize.INTEGER,
      allowNull: true // enquanto ainda existem aulas antigas
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Classes', 'dayOfWeek');
  }
};
