const Ranking = require("../models/ranking");
const sequelize = require("../models/config/database");

exports.obtenerTodosLosResultadosRanking = async (req, res) => {
    try {
        const ranking = await Ranking.findAll();
        res.status(200).json(ranking);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener los resultados del ranking' });
    }
};