const express = require('express');
const router = express.Router();
const retosController = require('../controllers/retoController'); /* Importa el controlador*/

/* Ruta para agregar un nuevo reto*/
router.post('/agregarreto', retosController.agregarReto);

/* Ruta para obtener todos los retos*/
router.get('/obtenerretos', retosController.obtenerTodosLosRetos);

module.exports = router;