const Poema = require("../models/poemas");
const Usuario = require("../models/usuario");

/*Agregar un nuevo poema*/
exports.agregarPoema = async (req, res) => {
    try {
        const { titulo_poema, rima, puntos_poema, usuario_id } = req.body;

        /*Valida que el usuario exista*/
        const usuario = await Usuario.findByPk(usuario_id);
        if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

        const nuevoPoema = await Poema.create({
            titulo_poema,
            rima,
            puntos_poema,
            usuario_id
        });

        res.status(201).json({ message: "Poema guardado con éxito", poema: nuevoPoema });
    } catch (error) {
        console.error("Error al guardar el poema:", error);
        res.status(500).json({ error: "Error al guardar el poema" });
    }
};

/*Obtiene todos los poemas*/
exports.obtenerTodosLosPoemas = async (req, res) => {
    try {
        const poemas = await Poema.findAll({ include: Usuario });
        res.status(200).json(poemas);
    } catch (error) {
        console.error("Error al obtener los poemas:", error);
        res.status(500).json({ error: "Error al obtener los poemas" });
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

