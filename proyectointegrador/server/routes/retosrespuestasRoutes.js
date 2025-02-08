const express = require("express");
const router = express.Router();
const upload = require("../models/config/multerconfig"); 
const retosRespuestasController = require("../controllers/retosRespuestasController");

// Rutas
router.post("/agregarrespuesta", upload.single("imagen_usuario"), retosRespuestasController.agregarRespuesta);
router.get("/obtenerrespuesta", retosRespuestasController.obtenerTodasLasRespuestas);
router.get("/reto/:reto_id", retosRespuestasController.obtenerRespuestasPorReto);

module.exports = router;
