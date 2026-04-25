const express = require('express');
const router = express.Router();
const departamentosController = require('../controllers/departamentosController');

router.get('/', departamentosController.getAll);
router.get('/:id', departamentosController.getById);
router.post('/', departamentosController.create);
router.put('/:id', departamentosController.update);
router.delete('/:id', departamentosController.remove);

module.exports = router;
