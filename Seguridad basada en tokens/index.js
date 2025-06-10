const express = require('express');
const sequelize = require('./config/database');
const Cliente = require('./models/cliente');
const Usuario = require('./models/usuario');

const clienteRoutes = require('./routes/cliente.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/clientes', clienteRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos conectada');
  app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
  });
});
