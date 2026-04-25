const express = require('express');
const router = express.Router();
const centrosController = require('../controllers/centrosController');

// CRUD Endpoints
router.get('/', centrosController.getAll);
router.get('/:id', centrosController.getById);
router.post('/', centrosController.create);
router.put('/:id', centrosController.update);
router.delete('/:id', centrosController.remove);

module.exports = router;
