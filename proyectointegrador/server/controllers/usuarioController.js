const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt"); /*libreria que ayuda a encriptar las contraseñas*/


/*Agregar un usuario*/
exports.agregarUsuario = async (req, res) => {
    console.log(" Datos recibidos:", req.body);
    try {
        const { nombre_usuario, nombre, apellido, email, contraseña } = req.body;

        if (!nombre_usuario || !nombre || !apellido || !email || !contraseña) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        /*Encripta la contraseña antes de guardarla*/
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        const nuevoUsuario = await Usuario.create({
            nombre_usuario,
            nombre,
            apellido,
            email,
            contraseña: hashedPassword
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
            attributes: ["id", "nombre_usuario", "nombre", "apellido", "email"]
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
