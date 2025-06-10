const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Articulo = sequelize.define('Articulo', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  descripcion: { type: DataTypes.STRING, allowNull: false },
  precio: { type: DataTypes.FLOAT, allowNull: false },
  existencia: { type: DataTypes.INTEGER, defaultValue: 0 }
});

module.exports = Articulo;
