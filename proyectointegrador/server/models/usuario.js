const { DataTypes } = require("sequelize");
const sequelize = require("./config/database");

const Usuario = sequelize.define("Usuario", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permiso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "catalogos", 
            key: "id"
        }

    },
    puntos: {
        type: DataTypes.INTEGER,
        defaultValue:0
    }
}, {
    tableName: "usuarios",
    timestamps: false
});

module.exports = Usuario;
