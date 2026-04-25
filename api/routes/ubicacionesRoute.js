const express = require('express');
const router = express.Router();
const ubicacionesController = require('../controllers/ubicacionesController');

router.get('/', ubicacionesController.getAll);
router.get('/:escuelaId/:centroId', ubicacionesController.getById);
router.post('/', ubicacionesController.create);
router.put('/:escuelaId/:centroId', ubicacionesController.update);
router.delete('/:escuelaId/:centroId', ubicacionesController.remove);

module.exports = router;
