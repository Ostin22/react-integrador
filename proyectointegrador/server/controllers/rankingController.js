
const db = require('../models'); // Asegúrate de tener configurada tu base de datos

exports.getRankingSemanal = async (req, res) => {
  try {
    // Aquí iría la lógica para obtener el ranking semanal de tu base de datos
    const rankingSemanal = await db.Usuario.findAll({
      attributes: ['id', 'username', 'points'],
      order: [['points', 'DESC']],
      limit: 10
    });

    res.json(rankingSemanal);
  } catch (error) {
    console.error('Error al obtener el ranking:', error);
    res.status(500).json({ message: 'Error al obtener el ranking' });
  }
