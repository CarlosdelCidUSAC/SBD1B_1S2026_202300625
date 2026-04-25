const express = require('express');
const router = express.Router();
const examenesController = require('../controllers/examenesController');

// CRUD Endpoints
router.get('/', examenesController.getAll);
router.get('/:id', examenesController.getById);
router.post('/', examenesController.create);
router.put('/:id', examenesController.update);
router.delete('/:id', examenesController.remove);

module.exports = router;
