const express = require('express');
const router = express.Router();
const correlativosController = require('../controllers/correlativosController');

router.get('/', correlativosController.getAll);
router.get('/:id', correlativosController.getById);
router.post('/', correlativosController.create);
router.put('/:id', correlativosController.update);
router.delete('/:id', correlativosController.remove);

module.exports = router;
