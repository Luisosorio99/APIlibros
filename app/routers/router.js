const express = require('express');
const router = express.Router();
const librosController = require('../controllers/libros.controller'); 


router.get('/libros/obtener', librosController.retrieveAllLibros);
router.post('/libros/crear', librosController.create);
router.get('/libros/:id', librosController.getLibroById);
router.put('/libros/actualizar/:id', librosController.updateById);
router.delete('/libros/eliminar/:id', librosController.deleteById);

module.exports = router;