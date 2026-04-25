const express = require('express');
const router = express.Router();
const escuelasController = require('../controllers/escuelasController');

router.get('/', escuelasController.getAll);
router.get('/:id', escuelasController.getById);
router.post('/', escuelasController.create);
router.put('/:id', escuelasController.update);
router.delete('/:id', escuelasController.remove);

module.exports = router;
