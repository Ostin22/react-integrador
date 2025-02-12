const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

/*Rutas para manejo de usuarios*/
router.post("/login", usuarioController.loginUsuario);
router.post("/agregarusuario", usuarioController.agregarUsuario);

/*Ruta para obtener el perfil del usuario*/
router.get("/perfil", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No autorizado" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Usuario.findByPk(decoded.id, {
            attributes: { exclude: ['contraseña'] }
        });

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(usuario);
    } catch (error) {
        console.error("Error en la ruta /perfil:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

/*Ruta para mostrar los usuarios en el ranking*/
router.get("/ranking", usuarioController.mostrarUsuariosRanking)

module.exports = router;
