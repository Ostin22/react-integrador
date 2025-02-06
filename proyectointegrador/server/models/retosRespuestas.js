const { DataTypes } = require("sequelize");
const sequelize = require("./config/database");
const Usuario = require("./usuario"); 
const Reto = require("./reto"); 

const RetosRespuestas = sequelize.define("RetosRespuestas", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    reto_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Reto,
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    imagen_usuario: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fecha_subida: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "retosrespuestas",
    timestamps: false
});

// Establecer relaciones
Usuario.hasMany(RetosRespuestas, { foreignKey: "usuario_id", onDelete: "CASCADE" });
RetosRespuestas.belongsTo(Usuario, { foreignKey: "usuario_id" });

Reto.hasMany(RetosRespuestas, { foreignKey: "reto_id", onDelete: "CASCADE" });
RetosRespuestas.belongsTo(Reto, { foreignKey: "reto_id" });

module.exports = RetosRespuestas;
