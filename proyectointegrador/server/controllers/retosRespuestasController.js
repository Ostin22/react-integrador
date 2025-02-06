const RetosRespuestas = require("../models/retosRespuestas");
const Usuario = require("../models/usuario");
const Reto = require("../models/reto");
const sequelize = require("../models/config/database");

/*Agregar una respuesta a un reto*/
exports.agregarRespuesta = async (req, res) => {
    try {
        let { reto_id, usuario_id, estado_id, descripcion } = req.body;

        /*Verifica si el usuario existe*/
        const usuario = await Usuario.findByPk(usuario_id);
        if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

        /*Verifica si el reto existe*/
        const reto = await Reto.findByPk(reto_id);
        if (!reto) return res.status(404).json({ error: "Reto no encontrado" });

        // Obtener el estado_id por defecto si no se proporciona
        if (!estado_id) {
            const [resultado] = await sequelize.query(
                "SELECT id FROM catalogos WHERE valor = 'PENDIENTE'"
            );
            if (resultado.length === 0) {
                return res.status(500).json({ error: "No se encontró el estado 'PENDIENTE' en la base de datos" });
            }
            estado_id = resultado[0].id;
        }

        /*Verificar si se subió una imagen*/
        let imagen_usuario = null;
        if (req.file) {
            imagen_usuario = `/public/imageuploadsdibujos/${req.file.filename}`;
        }

        /*detecta la fecha actual automaticamente*/
        const fecha_subida = new Date();

        /*Crear la respuesta al reto*/
        const nuevaRespuesta = await RetosRespuestas.create({
            usuario_id,
            reto_id,
            imagen_usuario,
            descripcion,
            fecha_subida,
            estado_id
        });

        res.status(201).json({ message: "Respuesta guardada con éxito", respuesta: nuevaRespuesta });
    } catch (error) {
        console.error("Error al guardar la respuesta:", error);
        res.status(500).json({ error: "Error al guardar la respuesta" });
    }
};

/* Obtiene todas las respuestas con los datos del usuario y del reto*/
exports.obtenerTodasLasRespuestas = async (req, res) => {
    try {
        const respuestas = await RetosRespuestas.findAll({
            include: [
                { model: Usuario, attributes: ["id", "nombre_usuario", "email"] },
                { model: Reto, attributes: ["id", "nombre"] }
            ]
        });

        res.status(200).json(respuestas);
    } catch (error) {
        console.error("Error al obtener respuestas:", error);
        res.status(500).json({ error: "Error al obtener respuestas" });
    }
};

/*Obtiene la respuesta de un reto específico*/
exports.obtenerRespuestasPorReto = async (req, res) => {
    try {
        const { reto_id } = req.params;

        const respuestas = await RetosRespuestas.findAll({
            where: { reto_id },
            include: [{ model: Usuario, attributes: ["id", "nombre_usuario", "email"] }]
        });

        if (!respuestas.length) return res.status(404).json({ error: "No hay respuestas para este reto" });

        res.status(200).json(respuestas);
    } catch (error) {
        console.error("Error al obtener respuestas:", error);
        res.status(500).json({ error: "Error al obtener respuestas" });
    }
};

