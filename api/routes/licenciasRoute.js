const express = require('express');
const router = express.Router();
const licenciasController = require('../controllers/licenciasController');

router.get('/', licenciasController.getAll);
router.get('/:id', licenciasController.getById);
router.post('/', licenciasController.create);
router.put('/:id', licenciasController.update);
router.delete('/:id', licenciasController.remove);

module.exports = router;
