const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt"); /*libreria que ayuda a encriptar las contraseñas*/
const sequelize = require("../models/config/database");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Registrar usuario
exports.agregarUsuario = async (req, res) => {
  try {
    let { nombre_usuario, nombre, apellido, email, contraseña, permiso_id } = req.body;

    if (!nombre_usuario || !nombre || !apellido || !email || !contraseña) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
    // Validar si el usuario ya existe
    console.log(req.body);
    let usuario = await Usuario.findOne({ where: { email: req.body.email } });
    console.log(usuario);
    if (usuario) {
        return res.status(400).json({ message: "El usuario ya existe" });
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
    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    // Crear el nuevo usuario
    const nuevoUsuario = await Usuario.create ({ 
        nombre_usuario,
        nombre, 
        apellido,
        email, 
        contraseña: hashedPassword,
        permiso_id 
    });


    // Generar JWT
    const token = jwt.sign({ id: nuevoUsuario.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ message: "Usuario registrado con éxito", usuario: nuevoUsuario });
    res.status(201).json({ token, usuario: { id: usuario.id, nombre_usuario, nombre, apellido, email, permiso_id} });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el token" });
  }
};

// Login de usuario
exports.loginUsuario = async (req, res) => {
    console.log("Se ha llamado a loginUsuario con:", req.body);
  
    const { nombre_usuario, contraseña } = req.body;
  
    // Validar que se proporcionen nombre_usuario y contraseña
    if (!nombre_usuario || !contraseña) {
      return res.status(400).json({ message: "Nombre de usuario y contraseña son obligatorios" });
    }
  
    try {
      console.log("Buscando usuario en la base de datos...");
  
      // Verificar si el usuario existe
      const usuario = await Usuario.findOne({ where: { nombre_usuario } });
      if (!usuario) {
        console.log("Usuario no encontrado:", nombre_usuario);
        return res.status(400).json({ message: "Credenciales inválidas" });
      }
      console.log("Usuario encontrado:", usuario);
  
      // Verificar la contraseña
      console.log("Comparando contraseñas...");
      const esCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);
      if (!esCorrecta) {
        console.log("Contraseña incorrecta para:", nombre_usuario);
        return res.status(400).json({ message: "Credenciales inválidas" });
      }
  
      // Generar JWT
      console.log("Generando token JWT...");
      const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      console.log("Usuario autenticado:", nombre_usuario);
  
      // Enviar respuesta con el token y la información del usuario
      return res.status(200).json({
        token,
        usuario: {
          id: usuario.id,
          nombre_usuario: usuario.nombre_usuario,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
        },
      });
  
    } catch (error) {
      console.error("Error en loginUsuario:", error);
      return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
  };