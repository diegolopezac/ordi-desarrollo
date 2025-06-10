const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controlador = require('../controllers/clienteController');

router.use(auth); // Proteger todas

router.post('/', controlador.crearCliente);
router.get('/', controlador.obtenerClientes);
router.get('/:id', controlador.obtenerCliente);
router.put('/:id', controlador.actualizarCliente);
router.delete('/:id', controlador.eliminarCliente);

module.exports = router;
