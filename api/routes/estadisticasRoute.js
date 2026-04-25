const express = require('express');
const router = express.Router();
const estadisticasController = require('../controllers/estadisticasController');

// GET /api/estadisticas/consulta1 - Estadísticas por centro y escuela
router.get('/consulta1', estadisticasController.estadisticasPorCentroYEscuela);

// GET /api/estadisticas/consulta2 - Ranking de evaluados
router.get('/consulta2', estadisticasController.rankingEvaluados);

// GET /api/estadisticas/consulta3 - Pregunta con menor aciertos
router.get('/consulta3', estadisticasController.preguntaMenorAciertos);

module.exports = router;
