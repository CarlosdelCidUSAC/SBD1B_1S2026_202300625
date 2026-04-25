const express = require('express');
const router = express.Router();
const registrosController = require('../controllers/registrosController');

router.get('/', registrosController.getAll);
router.get('/:id', registrosController.getById);
router.post('/', registrosController.create);
router.put('/:id', registrosController.update);
router.delete('/:id', registrosController.remove);

module.exports = router;
