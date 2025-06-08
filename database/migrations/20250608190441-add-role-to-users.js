'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.ENUM('aluno', 'personal', 'nutricionista', 'academia'),
      allowNull: false,
      defaultValue: 'aluno', // ou null se preferir obrigar no cadastro
    });

    await queryInterface.addColumn('Users', 'idade', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'descricao', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'endereco', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'ocupacaoMaxima', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'role');
    await queryInterface.removeColumn('Users', 'idade');
    await queryInterface.removeColumn('Users', 'descricao');
    await queryInterface.removeColumn('Users', 'endereco');
    await queryInterface.removeColumn('Users', 'ocupacaoMaxima');

    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_role";');
  }
};
