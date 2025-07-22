const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("review", {
    reviewText: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  });
};
