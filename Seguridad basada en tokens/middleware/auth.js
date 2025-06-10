const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ msg: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, 'secretojwt');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ msg: 'Token inválido' });
  }
};
