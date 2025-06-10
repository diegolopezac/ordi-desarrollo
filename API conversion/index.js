const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Base de datos en memoria
let monedas = {
  USD: 1,
  EUR: 0.9,
  GBP: 0.78
};

// Obtener todas las monedas
app.get('/api/monedas', (req, res) => {
  res.json(monedas);
});

// Convertir de una moneda a otra
app.get('/api/convertir', (req, res) => {
  const { de, a, cantidad } = req.query;

  if (!de || !a || !cantidad || isNaN(cantidad)) {
    return res.status(400).json({ error: 'Parámetros inválidos' });
  }

  const tasaDe = monedas[de.toUpperCase()];
  const tasaA = monedas[a.toUpperCase()];

  if (!tasaDe || !tasaA) {
    return res.status(404).json({ error: 'Una o ambas monedas no existen' });
  }

  const resultado = (cantidad / tasaDe) * tasaA;
  res.json({ resultado });
});

// Agregar nueva moneda
app.post('/api/monedas', (req, res) => {
  const { codigo, tasa } = req.body;

  if (!codigo || typeof tasa !== 'number' || tasa <= 0) {
    return res.status(400).json({ error: 'Código o tasa inválida' });
  }

  const codigoMayus = codigo.toUpperCase();
  if (monedas[codigoMayus]) {
    return res.status(400).json({ error: 'Moneda ya existe' });
  }

  monedas[codigoMayus] = tasa;
  res.status(201).json({ codigo: codigoMayus, tasa });
});

// Editar moneda existente
app.put('/api/monedas/:codigo', (req, res) => {
  const codigo = req.params.codigo.toUpperCase();
  const { tasa } = req.body;

  if (!monedas[codigo]) {
    return res.status(404).json({ error: 'Moneda no encontrada' });
  }

  if (typeof tasa !== 'number' || tasa <= 0) {
    return res.status(400).json({ error: 'Tasa inválida' });
  }

  monedas[codigo] = tasa;
  res.json({ codigo, tasa });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
