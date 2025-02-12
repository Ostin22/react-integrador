const express = require('express');
const router = express.Router();
const poemaController = require('../controllers/poemaController'); 
const authMiddleware = require('../middleware/authMiddleware')

/*ruta para agregar poemas*/
router.post('/agregarpoema', authMiddleware, poemaController.agregarPoema);
/*ruta para obtener poemas*/
router.get("/obtenerpoemas", poemaController.obtenerTodosLosPoemas);
router.get("/:id", poemaController.obtenerPoemaPorId);
module.exports = router;

