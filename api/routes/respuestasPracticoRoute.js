const express = require('express');
const router = express.Router();
const respuestasPracticoController = require('../controllers/respuestasPracticoController');

router.get('/', respuestasPracticoController.getAll);
router.get('/:id', respuestasPracticoController.getById);
router.post('/', respuestasPracticoController.create);
router.put('/:id', respuestasPracticoController.update);
router.delete('/:id', respuestasPracticoController.remove);

module.exports = router;
