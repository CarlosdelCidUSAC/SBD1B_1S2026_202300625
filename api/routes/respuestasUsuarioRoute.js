const express = require('express');
const router = express.Router();
const respuestasUsuarioController = require('../controllers/respuestasUsuarioController');

router.get('/', respuestasUsuarioController.getAll);
router.get('/:id', respuestasUsuarioController.getById);
router.post('/', respuestasUsuarioController.create);
router.put('/:id', respuestasUsuarioController.update);
router.delete('/:id', respuestasUsuarioController.remove);

module.exports = router;
