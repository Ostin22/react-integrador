const express = require("express");
const router = express.Router();
const upload = require("../models/config/multerconfig"); /*Importar la configuración de multer*/
const dibujoController = require("../controllers/dibujoController");
const multer = require("../models/config/multerconfig")

// Ruta para subir un dibujo con imagen
router.post("/agregardibujo", (req, res, next) => {
    upload.single("imagen")(req, res, (err) => {
      if (err) {
        console.error("Error de Multer:", err.message);
        return res.status(400).json({ error: err.message });
      }
      console.log("Archivo recibido:", req.file);
      next();
    });
  }, dibujoController.agregarDibujo);

// Ruta para obtener todos los dibujos
router.get("/obtenerdibujos", dibujoController.obtenerTodosLosDibujos);

module.exports = router;

