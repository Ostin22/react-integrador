
let express = require('express');
let router = express.Router();
let path = require('path');
const retoController = require ("../controllers/retoController.js");

//Ruta para agregar un nuevo reto.
router.post('/agregarreto', retoController.AgregarReto);
//ruta para cargar la plantilla de agregar un reto

//Ruta para cargar la plantilla del index


//ruta de la api con todos los dato
router.get('/api/todos', retoController.obtenerTodosLosRetos);
module.exports = router;


