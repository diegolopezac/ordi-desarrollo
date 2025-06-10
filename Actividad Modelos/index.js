const express = require('express');
const sequelize = require('./config/database');

// Modelos
require('./models/cliente');
require('./models/proveedor');
require('./models/articulo');
require('./models/empleado');

const app = express();
app.use(express.json());

sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos sincronizada');
}).catch(err => {
  console.error('Error al sincronizar la base de datos:', err);
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
