const express = require('express');
const router = express.Router();
const rankingController = require('../controllers/rankingController');

/* Ruta para obtener todos los retos*/
router.get('/obtenerresultadosranking', rankingController.obtenerTodosLosResultadosRanking);

module.exports = router;