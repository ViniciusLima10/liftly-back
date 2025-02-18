'use strict';

module.exports = (sequelize, DataTypes) => {
  const Gym = sequelize.define(
    'Gym',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );

  Gym.associate = function (models) {
    // Associações podem ser definidas aqui
  };

  return Gym;
};
