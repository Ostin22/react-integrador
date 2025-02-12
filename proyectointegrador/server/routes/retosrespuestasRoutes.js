const express = require("express");
const router = express.Router();
const retosRespuestasController = require("../controllers/retosRespuestasController");

/* Ruta para subir la respuesta del reto */
router.post('/subir', retosRespuestasController.subirRespuestaReto);

/* Ruta para obtener todas las respuestas pendientes y colocarlas en moderación} */
router.get('/pendientes',  retosRespuestasController.obtenerRespuestasPendientes);

/* Ruta para procesar la respuesta del reto en la vista protegida */
router.post('/procesar',retosRespuestasController.procesarRespuesta);

module.exports = router;
