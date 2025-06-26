'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    // Só adiciona o que NÃO existe ainda:
    await qi.addColumn('Gyms','email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }).catch(()=>{});
    await qi.addColumn('Gyms','password', {
      type: Sequelize.STRING,
      allowNull: false
    }).catch(()=>{});
    await qi.addColumn('Gyms','address', {
      type: Sequelize.STRING,
      allowNull: false
    }).catch(()=>{});
    await qi.addColumn('Gyms','capacity', {
      type: Sequelize.INTEGER,
      allowNull: false
    }).catch(()=>{});
    await qi.addColumn('Gyms','telefone', {
      type: Sequelize.STRING,
      allowNull: false
    }).catch(()=>{});
  },
  down: async (qi) => {
    for (const col of ['email','password','address','capacity','telefone']) {
      await qi.removeColumn('Gyms', col).catch(()=>{});
    }
  }
};
