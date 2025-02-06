const Dibujo = require("../models/dibujo");
const Usuario = require("../models/usuario"); 
const path = require("path");
const sequelize = require("../models/config/database")

exports.agregarDibujo = async (req, res) => {
    try {
        const { nombre_dibujo, puntos_dibujo, usuario_id } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "No se subió ninguna imagen" });
        }

        /*Verificar si el usuario ya existe*/
        const usuario = await Usuario.findByPk(usuario_id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        /*coloca los puntos para cada dibujo*/
        if (!puntos_dibujo) {
            const [resultado] = await sequelize.query(
                "SELECT valornumerico FROM catalogos WHERE tipo = 'PUNTOS'"
            );
            if (resultado.length === 0) {
                return res.status(500).json({ error: "No se encontró el valor de los puntos para dibujos" });
            }
            puntos_dibujo = resultado[0].valor;
        }

        /*Ruta donde la imagen se guardara*/
        const imagen = `/public/imageuploadsdibujos/${req.file.filename}`;

        /*detecta la fecha actual automaticamente*/
        const fecha_subida = new Date();

        /*Guardar en la base de datos*/
        const nuevoDibujo = await Dibujo.create({
            nombre_dibujo,
            imagen,
            puntos_dibujo: puntos_dibujo || 0,
            usuario_id,
            fecha_subida
        });

        res.status(201).json({ message: "Dibujo guardado con éxito", dibujo: nuevoDibujo });
    } catch (error) {
        console.error("Error al subir el dibujo:", error);
        res.status(500).json({ error: "Error al subir el dibujo" });
    }
};

exports.obtenerTodosLosDibujos = async (req, res) => {
    try {
        const dibujos = await Dibujo.findAll({
            include: {
                model: Usuario,
                attributes: ["id", "nombre_usuario", "email"] /*Muestra datos del usuario*/
            }
        });
        res.json(dibujos);
    } catch (error) {
        console.error("Error al obtener los dibujos:", error);
        res.status(500).json({ error: "Error al obtener los dibujos" });
    }
};


