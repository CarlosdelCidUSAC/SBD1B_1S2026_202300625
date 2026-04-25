const express = require('express');
const router = express.Router();
const preguntasPracticoController = require('../controllers/preguntasPracticoController');

router.get('/', preguntasPracticoController.getAll);
router.get('/:id', preguntasPracticoController.getById);
router.post('/', preguntasPracticoController.create);
router.put('/:id', preguntasPracticoController.update);
router.delete('/:id', preguntasPracticoController.remove);

module.exports = router;
