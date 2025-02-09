const { DataTypes } = require("sequelize");
const sequelize = require("./config/database");
const Usuario = require("./usuario");

const Dibujo = sequelize.define("Dibujo", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Usuario,
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },
    nombre_dibujo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true
    },
    puntos_dibujo: {
        type: DataTypes.INTEGER,
        defaultValue: 0, 
        allowNull: false
    },
    fecha_subida: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
}, {
    tableName: "dibujos",
    timestamps: false
});

/*Establecemos la relación con Usuario*/
Dibujo.belongsTo(Usuario, { foreignKey: "usuario_id" });

module.exports = Dibujo;
