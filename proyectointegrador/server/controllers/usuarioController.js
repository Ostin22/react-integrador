const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt"); /*libreria que ayuda a encriptar las contraseñas*/
const sequelize = require("../models/config/database");

/*Agregar un usuario*/
exports.agregarUsuario = async (req, res) => {
    try {
        let { nombre_usuario, nombre, apellido, email, contraseña, permiso_id } = req.body;

        if (!nombre_usuario || !nombre || !apellido || !email || !contraseña) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        /*Hace un select de la base de datos colocando la id del catalogo donde el valor sea igual a el permiso usuario*/
        if (!req.body.permiso_id) {
            const [resultado] = await sequelize.query(
                "SELECT id FROM catalogos WHERE VALOR = 'USER' LIMIT 1"
            );

            if (resultado.length === 0) {
                return res.status(500).json({ error: "No se encontró el permiso 'USER' en la base de datos" });
            }

            permiso_id = resultado[0].id; /*Asigna la ID del permiso "USER"*/
        }
        console.log("Permiso ID asignado:", permiso_id);

        /*Encripta la contraseña antes de guardarla*/
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        const nuevoUsuario = await Usuario.create({
            nombre_usuario,
            nombre,
            apellido,
            email,
            contraseña: hashedPassword,
            permiso_id 
        });

        res.status(201).json({ message: "Usuario registrado con éxito", usuario: nuevoUsuario });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ error: "Error al registrar usuario" });
    }
};

/*Obtiene todos los usuarios*/
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: ["id", "nombre_usuario", "nombre", "apellido", "email", "contraseña", "permiso_id"]
        });
        res.json(usuarios);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
};

/*Obtiene un usuario por ID*/
exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id, {
            attributes: ["id", "nombre_usuario", "nombre", "apellido", "email"]
        });

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json(usuario);
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        res.status(500).json({ error: "Error al obtener usuario" });
    }
};
