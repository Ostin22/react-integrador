const Dibujo = require("../models/dibujo");
const Usuario = require("../models/usuario"); 
const path = require("path");
const sequelize = require("../models/config/database")


async function verificarLimite(usuario_id) {
  try {
    /* Cuenta la cantidad de dibujos del usuario */
    const cantidadDibujos = await Dibujo.count({ where: { usuario_id } });

    /* Verifica si el usuario ha alcanzado el límite */
    if (cantidadDibujos >= 2) {
      return true; 
    }

    return false; 
  } catch (error) {
    console.error("Error al verificar el límite:", error);
    throw error;
  }
}



exports.agregarDibujo = async (req, res) => {
  try {
    const { nombre_dibujo, puntos_dibujo, usuario_id } = req.body;

    const limiteAlcanzado = await verificarLimite(usuario_id);
    if (limiteAlcanzado) {
      return res.status(400).json({ type: "error", message: "Has alcanzado el límite de 2 dibujos" });
    }

    if (!req.file) {
      return res.status(400).json({ type: "error", message: "No se subió ninguna imagen" });
    }

    const usuario = await Usuario.findByPk(usuario_id);
    if (!usuario) {
      return res.status(404).json({ type: "error", message: "Usuario no encontrado" });
    }

    let puntos = puntos_dibujo;
    if (!puntos) {
      const [resultado] = await sequelize.query(
        "SELECT valornumerico FROM catalogos WHERE tipo = 'PUNTOS'"
      );
      puntos = resultado.length ? resultado[0].valornumerico : 0;
    }

    const imagen = `/public/imageuploadsdibujos/${req.file.filename}`;
    const fecha_subida = new Date();

    const nuevoDibujo = await Dibujo.create({
      nombre_dibujo,
      imagen,
      puntos_dibujo: puntos,
      fecha_subida,
      usuario_id,
    });

    await Usuario.update(
      { puntos: sequelize.literal('puntos + 4') },
      { where: { id: usuario_id } }
    );

    res.status(201).json({
      type: "success",
      message: "Dibujo guardado con éxito y se sumaron 4 puntos al usuario",
      dibujo: nuevoDibujo,
    });
  } catch (error) {
    console.error("Error al subir el dibujo:", error);
    res.status(500).json({ type: "error", message: "Error al subir el dibujo" });
  }
};


exports.obtenerTodosLosDibujos = async (req, res) => {
try {
    const dibujos = await Dibujo.findAll({
        include: {
          model: Usuario,
          attributes: ["id", "nombre_usuario", "email"]
        }
    });
    const dibujosConRutas = dibujos.map(dibujo => {
      const dibujoData = dibujo.get({ plain: true });
      return {
          ...dibujoData,
          imagenUrl: dibujoData.imagen ? `${dibujoData.imagen}` : null
      };
  });

    console.log("Dibujos obtenidos:", dibujosConRutas);
    res.json(dibujosConRutas);
}catch (error) {
  console.error("Error al obtener los dibujos:", error);
  res.status(500).json({ error: "Error al obtener los dibujos" });
}
};
