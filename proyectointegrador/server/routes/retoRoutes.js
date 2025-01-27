let express = require('express');
let router = express.Router();
let path = require('path');
let retoController = require('../controllers/retoController');
let app = express();
//Ruta para agregar un nuevo reto.
router.post('/agregarreto', retoController.AgregarReto);
//ruta para cargar la plantilla de agregar un reto

//Ruta para cargar la plantilla del index


//ruta de la api con todos los datos
router.get('/api/todos', retoController.obtenerTodosLosRetos);

module.exports = router;

