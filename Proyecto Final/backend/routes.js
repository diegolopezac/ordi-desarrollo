const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/items', (req, res) => {
  db.all("SELECT * FROM items", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

router.post('/items', (req, res) => {
  const { name } = req.body;
  db.run("INSERT INTO items (name) VALUES (?)", [name], function(err) {
    if (err) return res.status(500).json(err);
    res.json({ id: this.lastID, name });
  });
});

router.put('/items/:id', (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  db.run("UPDATE items SET name = ? WHERE id = ?", [name, id], function(err) {
    if (err) return res.status(500).json(err);
    res.json({ updated: this.changes });
  });
});

router.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM items WHERE id = ?", [id], function(err) {
    if (err) return res.status(500).json(err);
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
