'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adiciona a coluna "role"
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.ENUM('student', 'teacher', 'owner', 'nutritionist'),
      allowNull: false,
      defaultValue: 'student',
    });

    // Altera a coluna "telefone" para tornar obrigatório
    await queryInterface.changeColumn('Users', 'telefone', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Volta a coluna "telefone" para permitir nulo
    await queryInterface.changeColumn('Users', 'telefone', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
