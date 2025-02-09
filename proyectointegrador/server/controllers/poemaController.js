const Poema = require("../models/poemas");
const Usuario = require("../models/usuario");
const sequelize = require("../models/config/database");

/*Agregar un nuevo poema*/
exports.agregarPoema = async (req, res) => {
    try {
        const { titulo_poema, rima, puntos_poema, usuario_id } = req.body;

        if (!titulo_poema || !rima) {
            return res.status(400).json({ error: "Título y rima son requeridos" });
        }

        const usuario = await Usuario.findByPk(usuario_id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const puntos = puntos_poema || await obtenerPuntosDefault('PUNTOS');

        const nuevoPoema = await Poema.create({
            titulo_poema,
            rima,
            puntos_poema: puntos,
            usuario_id,
            fecha_subida: new Date()
        });

        res.status(201).json({ message: "Poema guardado con éxito", poema: nuevoPoema });
    } catch (error) {
        console.error("Error al guardar el poema:", error);
        res.status(500).json({ error: "Error al guardar el poema" });
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
            include: [{
                model: Usuario,
                attributes: ['nombre_usuario', 'nombre', 'apellido'] 
            }],
            order: [['fecha_subida', 'DESC']]
        });
        res.json(poemas);
    } catch (error) {
        console.error('Error al obtener poemas:', error);
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

