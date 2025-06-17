'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adiciona o valor 'professor' ao enum existente (Postgres exige comando raw)
    await queryInterface.sequelize.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_type t
          JOIN pg_enum e ON t.oid = e.enumtypid
          WHERE t.typname = 'enum_UserGyms_role' AND e.enumlabel = 'professor'
        ) THEN
          ALTER TYPE "enum_UserGyms_role" ADD VALUE 'professor';
        END IF;
      END $$;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // OBS: Postgres não suporta remover valores de ENUM diretamente
    console.warn('⚠️  Postgres não suporta remover valores de enum. Down não fará nada.');
    return Promise.resolve();
  }
};
