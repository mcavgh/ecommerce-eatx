const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      //  allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    photoURL: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    access: {
      type: DataTypes.ENUM,
      values: ["User", "Admin"],
      defaultValue: "User",
    },
  });
};
