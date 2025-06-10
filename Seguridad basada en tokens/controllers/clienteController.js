const Cliente = require('../models/cliente');

// Crear
exports.crearCliente = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.json(cliente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Leer todos
exports.obtenerClientes = async (req, res) => {
  const clientes = await Cliente.findAll();
  res.json(clientes);
};

// Leer uno
exports.obtenerCliente = async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  cliente ? res.json(cliente) : res.status(404).send('No encontrado');
};

// Actualizar
exports.actualizarCliente = async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (cliente) {
    await cliente.update(req.body);
    res.json(cliente);
  } else {
    res.status(404).send('No encontrado');
  }
};

// Eliminar
exports.eliminarCliente = async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (cliente) {
    await cliente.destroy();
    res.send('Eliminado');
  } else {
    res.status(404).send('No encontrado');
  }
};
