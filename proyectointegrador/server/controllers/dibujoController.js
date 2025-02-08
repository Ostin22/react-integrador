const Dibujo = require("../models/dibujo");
const Usuario = require("../models/usuario"); 
const path = require("path");
const sequelize = require("../models/config/database")

exports.agregarDibujo = async (req, res) => {
    try {
        const { nombre_dibujo, puntos_dibujo } = req.body;

        // Verificar si se subió una imagen
        if (!req.file) {
            console.log("No se subió ninguna imagen.");
            return res.status(400).json({ error: "No se subió ninguna imagen" });
        }
        
        console.log("Datos recibidos:", { nombre_dibujo, puntos_dibujo });
        console.log(req.body);  // This will show the entire request body
        console.log(req.file);  // This will show the file information


        // Verificar si el usuario existe
        /*const usuario = await Usuario.findByPk(usuario_id);
        if (!usuario) {
            console.log(`Usuario con ID ${usuario_id} no encontrado.`);
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        console.log("Usuario encontrado:", usuario);*/

        // Asignar valor por defecto a puntos_dibujo si no se proporciona
        if (!puntos_dibujo) {
            console.log("No se proporcionaron puntos, consultando el valor por defecto...");
            const [resultado] = await sequelize.query(
                "SELECT valornumerico FROM catalogos WHERE tipo = 'PUNTOS'"
            );
            if (resultado.length === 0) {
                console.log("No se encontró el valor de los puntos para dibujos.");
                return res.status(500).json({ error: "No se encontró el valor de los puntos para dibujos" });
            }
            puntos_dibujo = resultado[0].valor;
            console.log("Valor de puntos obtenido:", puntos_dibujo);
        }

        // Ruta donde la imagen se guardará
        const imagen = `/public/imageuploadsdibujos/${req.file.filename}`;
        console.log("Ruta de imagen:", imagen);

        // Fecha actual
        const fecha_subida = new Date();
        console.log("Fecha de subida:", fecha_subida);

        // Guardar dibujo en la base de datos
        const nuevoDibujo = await Dibujo.create({
            nombre_dibujo,
            imagen,
            puntos_dibujo: puntos_dibujo || 0,
            fecha_subida
        });

        console.log("Nuevo dibujo guardado:", nuevoDibujo);
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
                attributes: ["id", "nombre_usuario", "email"] // Muestra datos del usuario
            }
        });
        
        console.log("Dibujos obtenidos:", dibujos);
        res.json(dibujos);
    } catch (error) {
        console.error("Error al obtener los dibujos:", error);
        res.status(500).json({ error: "Error al obtener los dibujos" });
    }
};

