const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  // defino el modelo
  sequelize.define('newsletter', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
  
  });
};
