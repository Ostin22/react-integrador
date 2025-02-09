const { DataTypes } = require("sequelize");
const sequelize = require("./config/database");
const Usuario = require("./usuario"); 

const Poema = sequelize.define("Poema", {
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
        }
    },
    titulo_poema: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rima: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    puntos_poema: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    fecha_subida: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
}, {
    tableName: "poemas",
    timestamps: false
});

/*Establecer relación con Usuario (Un usuario puede tener varios poemas)*/
Usuario.hasMany(Poema, { foreignKey: "usuario_id", onDelete: "CASCADE" });
Poema.belongsTo(Usuario, { foreignKey: "usuario_id" });

module.exports = Poema;
