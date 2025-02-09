const express = require("express");
const router = express.Router();
const upload = require("../models/config/multerconfig"); 
const retosRespuestasController = require("../controllers/retosRespuestasController");

// Rutas
router.post('/subir', retosRespuestasController.subirRespuestaReto);
router.get('/pendientes',  retosRespuestasController.obtenerRespuestasPendientes);
router.post('/procesar',retosRespuestasController.procesarRespuesta);

module.exports = router;
