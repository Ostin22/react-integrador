const Dibujo = require("../models/dibujo");
const Poema = require("../models/poema");

exports.verificarLimiteArtistico = async (req, res) => {
  try {
    const { usuario_id } = req.params;

    const cantidadPoemas = await Poema.count({ where: { usuario_id } });
    const cantidadDibujos = await Dibujo.count({ where: { usuario_id } });

    if (cantidadPoemas >= 2 || cantidadDibujos >= 2) {
      return res.status(400).json({ error: "Solo puedes subir 2 elementos al apartado artístico por usuario." });
    }

    res.status(200).json({ message: "Puedes subir más contenido." });
  } catch (error) {
    console.error("Error al verificar el límite:", error);
    res.status(500).json({ error: "Error al verificar el límite" });
  }
};
