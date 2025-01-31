import { DataTypes } from "sequelize";
import sequelize from "./database.js";


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
    puntos: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "reto",
    timestamps: false
});

export default Reto;




