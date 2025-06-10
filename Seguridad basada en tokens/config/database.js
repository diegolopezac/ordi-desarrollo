const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('clientesdb', 'usuario', 'contraseña', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
