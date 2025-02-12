const Poema = require("../models/poemas");
const Usuario = require("../models/usuario");

const sequelize = require("../models/config/database");



async function verificarLimite(usuario_id) {
  try {
    /* Cuenta la cantidad de poemas del usuario */
    const cantidadPoemas = await Poema.count({ where: { usuario_id } });

    /* Verifica si el usuario ha alcanzado el límite */
    if (cantidadPoemas >= 2) {
      return true; 
    }

    return false; 
  } catch (error) {
    console.error("Error al verificar el límite:", error);
    throw error;
  }
}

/*Agregar un nuevo poema*/
exports.agregarPoema = async (req, res) => {
  try {
    const { titulo_poema, rima, puntos_poema, usuario_id } = req.body;

    const limiteAlcanzado = await verificarLimite(usuario_id);
    if (limiteAlcanzado) {
      return res.status(400).json({ type: "error", message: "Has alcanzado el límite de 2 poemas" });
    }

    if (!titulo_poema || !rima) {
      return res.status(400).json({ type: "error", message: "Título y rima son requeridos" });
    }

    const usuario = await Usuario.findByPk(usuario_id);
    if (!usuario) {
      return res.status(404).json({ type: "error", message: "Usuario no encontrado" });
    }

    const puntos = puntos_poema || (await obtenerPuntosDefault("PUNTOS"));

    const nuevoPoema = await Poema.create({
      titulo_poema,
      rima,
      puntos_poema: puntos,
      usuario_id,
      fecha_subida: new Date(),
    });

    usuario.puntos += 4;
    await usuario.save();

    res.status(201).json({
      type: "success",
      message: "Poema guardado con éxito y se sumaron 4 puntos al usuario",
      poema: nuevoPoema,
    });
  } catch (error) {
    console.error("Error al guardar el poema:", error);
    res.status(500).json({ type: "error", message: "Error al guardar el poema" });
  }
};


async function obtenerPuntosDefault(tipo) {
  const [resultado] = await sequelize.query(
    "SELECT valornumerico FROM catalogos WHERE tipo = :tipo",
    { replacements: { tipo: tipo } }
  );
  return resultado.length ? resultado[0].valornumerico : null;
}

/*Obtiene todos los poemas*/
exports.obtenerTodosLosPoemas = async (req, res) => {
  try {
    const poemas = await Poema.findAll({
      include: [
        {
          model: Usuario,
          attributes: ["nombre_usuario", "nombre", "apellido"],
        },
      ],
      order: [["fecha_subida", "DESC"]],
    });
    res.json(poemas);
  } catch (error) {
    console.error("Error al obtener poemas:", error);
    res.status(500).json({ message: "Error al obtener los poemas" });
  }
};

/*Obtiene un poema por su ID*/
exports.obtenerPoemaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const poema = await Poema.findByPk(id, { include: Usuario });

    if (!poema) return res.status(404).json({ error: "Poema no encontrado" });

    res.status(200).json(poema);
  } catch (error) {
    console.error("Error al obtener el poema:", error);
    res.status(500).json({ error: "Error al obtener el poema" });
  }
};


exports.obtenerCantidadPoemasPorUsuario = async (req, res) => {
    try {
      const { usuario_id } = req.params;
  
      const cantidad = await Poema.count({ where: { usuario_id } });
  
      res.status(200).json({ cantidad });
    } catch (error) {
      console.error('Error al obtener la cantidad de poemas:', error);
      res.status(500).json({ error: 'Error al obtener la cantidad de poemas' });
    }
  };
  