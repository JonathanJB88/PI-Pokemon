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
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hp: { type: DataTypes.INTEGER, validate: { min: 1, max: 100 } },
      attack: { type: DataTypes.INTEGER, validate: { min: 1, max: 100 } },
      defense: { type: DataTypes.INTEGER, validate: { min: 1, max: 100 } },
      speed: { type: DataTypes.INTEGER, validate: { min: 1, max: 100 } },
      height: { type: DataTypes.INTEGER, validate: { min: 1, max: 100 } },
      weight: { type: DataTypes.INTEGER, validate: { min: 1, max: 100 } },
      image: {
        type: DataTypes.STRING,
        defaultValue:
          "https://i.pinimg.com/originals/f9/7f/5c/f97f5c6510994f677877b08320475008.gif",
        validate: { isUrl: true },
      },
      abilities: { type: DataTypes.JSON },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
