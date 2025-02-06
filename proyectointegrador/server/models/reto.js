const { DataTypes } = require("sequelize");
const sequelize = require("./config/database"); 

const Reto = sequelize.define("Reto", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    puntos_retos: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "retos",
    timestamps: false
});


module.exports = Reto;




