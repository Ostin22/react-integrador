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
        return res.status(400).json({ type: "error", message: "Todos los campos son obligatorios" });
      }
  
      let usuario = await Usuario.findOne({ where: { email } });
  
      if (usuario) {
        return res.status(400).json({ type: "error", message: "El usuario ya existe" });
      }
  
      if (!permiso_id) {
        const [resultado] = await sequelize.query("SELECT id FROM catalogos WHERE VALOR = 'USER' LIMIT 1");
        if (!resultado.length) {
          return res.status(500).json({ type: "error", message: "No se encontró el permiso 'USER' en la base de datos" });
        }
        permiso_id = resultado[0].id;
      }
  
      const hashedPassword = await bcrypt.hash(contraseña, 10);
  
      const nuevoUsuario = await Usuario.create({
        nombre_usuario,
        nombre,
        apellido,
        email,
        contraseña: hashedPassword,
        permiso_id,
      });
  
      const token = jwt.sign({ id: nuevoUsuario.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  
      return res.status(201).json({ type: "success", message: "Usuario registrado con éxito", token });
    } catch (error) {
      return res.status(500).json({ type: "error", message: "Error al registrar usuario", error: error.message });
    }
  };
  

// Login de usuario
exports.loginUsuario = async (req, res) => {
    const { nombre_usuario, contraseña } = req.body;
  
    if (!nombre_usuario || !contraseña) {
      return res.status(400).json({ type: "error", message: "Nombre de usuario y contraseña son obligatorios" });
    }
  
    try {
      const usuario = await Usuario.findOne({ where: { nombre_usuario } });
      if (!usuario) {
        return res.status(404).json({ type: "error", message: "Usuario no encontrado" });
      }
  
      const esCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);
      if (!esCorrecta) {
        return res.status(400).json({ type: "error", message: "Credenciales inválidas" });
      }
  
      const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  
      return res.status(200).json({ type: "success", message: "Login exitoso", token });
    } catch (error) {
      return res.status(500).json({ type: "error", message: "Error en el servidor", error: error.message });
    }
  };
  

exports.mostrarUsuariosRanking = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            order: [[ 'puntos', 'DESC' ]],
            limit: 5,
        });
        console.log('Usuario mostrado correctamente en el ranking', usuarios);
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener los usuarios para el ranking' });
    }
};