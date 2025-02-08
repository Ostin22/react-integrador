const express = require("express");
const router = express.Router();
const poemaController = require("../controllers/poemaController");

// Definir rutas
router.post("/agregarpoema", poemaController.agregarPoema);
router.get("/obtenerpoemas", poemaController.obtenerTodosLosPoemas);
router.get("/:id", poemaController.obtenerPoemaPorId);

module.exports = router;
