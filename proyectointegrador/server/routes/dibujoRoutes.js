const express = require("express");
const router = express.Router();
const upload = require("../models/config/multerconfig"); /*Importar la configuración de multer*/
const dibujoController = require("../controllers/dibujoController");

// Ruta para subir un dibujo con imagen
router.post("/agregar", upload.single("imagen"), dibujoController.agregarDibujo);

// Ruta para obtener todos los dibujos
router.get("/listar", dibujoController.obtenerTodosLosDibujos);

module.exports = router;

