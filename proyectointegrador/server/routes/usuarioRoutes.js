const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

// Ruta para agregar un usuario
router.post("/agregarusuario", usuarioController.agregarUsuario);

// Ruta para obtener todos los usuarios
router.get("/obtenerusuario", usuarioController.obtenerUsuarios);

// Ruta para obtener un usuario por ID
router.get("/:id", usuarioController.obtenerUsuarioPorId);

module.exports = router;
