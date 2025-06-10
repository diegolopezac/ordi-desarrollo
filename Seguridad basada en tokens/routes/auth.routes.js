const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

// Registro
router.post('/register', async (req, res) => {
  try {
    const user = await Usuario.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await Usuario.findOne({ where: { username } });
  if (!user) return res.status(401).json({ msg: 'Usuario no encontrado' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ msg: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: user.id, username }, 'secretojwt', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
