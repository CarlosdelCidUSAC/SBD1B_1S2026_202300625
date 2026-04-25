const express = require('express');
const router = express.Router();
const preguntasController = require('../controllers/preguntasController');

router.get('/', preguntasController.getAll);
router.get('/:id', preguntasController.getById);
router.post('/', preguntasController.create);
router.put('/:id', preguntasController.update);
router.delete('/:id', preguntasController.remove);

module.exports = router;
