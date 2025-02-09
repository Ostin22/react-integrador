const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const poemaController = require('../controllers/poemaController'); // Asegúrate de que la ruta al controlador sea correcta
const authMiddleware = require('../middleware/authMiddleware')

/*ruta para agregar poemas*/
router.post('/agregarpoema', authMiddleware, poemaController.agregarPoema);

router.get("/obtenerpoemas", poemaController.obtenerTodosLosPoemas);
router.get("/:id", poemaController.obtenerPoemaPorId);

module.exports = router;

