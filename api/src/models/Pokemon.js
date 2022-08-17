const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hp: { type: DataTypes.INTEGER },
      attack: { type: DataTypes.INTEGER },
      defense: { type: DataTypes.INTEGER },
      speed: { type: DataTypes.INTEGER },
      height: { type: DataTypes.INTEGER },
      weight: { type: DataTypes.INTEGER },
      image: {
        type: DataTypes.STRING,
        defaultValue:
          "https://www.seekpng.com/png/full/125-1251017_can-you-become-a-pokmon-master-like-me.png",
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
