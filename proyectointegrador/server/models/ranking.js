const { DataTypes } = require("sequelize");
const sequelize = require("./config/database");

const Ranking = sequelize.define("Ranking", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    puntos_ranking: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
}, {
    tableName: "ranking",
    timestamps: false
})

module.exports = Ranking;