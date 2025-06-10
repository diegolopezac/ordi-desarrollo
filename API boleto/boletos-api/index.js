const express = require('express');
const app = express();

app.use(express.json());

const precios = {
  A: 300,
  B: 490,
  C: 670,
  D: 899
};

function calcularPrecio(dia, secciones) {
  let totalBoletos = 0;
  let subtotal = 0;

  for (const seccion in secciones) {
    const cantidad = secciones[seccion];
    const precio = precios[seccion.toUpperCase()] || 0;

    totalBoletos += cantidad;
    subtotal += precio * cantidad;
  }

  // Descuento por día domingo (16% por boleto)
  if (dia.toLowerCase() === 'domingo') {
    subtotal *= 0.84; // 16% descuento
  }

  // Descuento por más de un boleto (5% del total)
  if (totalBoletos > 1) {
    subtotal *= 0.95; // 5% descuento
  }

  return subtotal.toFixed(2);
}

app.post('/api/boletos', (req, res) => {
  const { dia, secciones } = req.body;

  if (!dia || !secciones || typeof secciones !== 'object') {
    return res.status(400).json({ error: 'Faltan datos o formato incorrecto' });
  }

  const precioFinal = calcularPrecio(dia, secciones);
  res.json({ precio: precioFinal });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
