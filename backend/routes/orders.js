const express = require('express');
const router = express.Router();

module.exports = (db, jwt, SECRET_KEY) => {
  router.get('/', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Failed to authenticate token' });
        return;
      }

      const userId = decoded.userId;
      db.all('SELECT * FROM orders WHERE user_id = ?', [userId], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ orders: rows });
      });
    });
  });

  return router;
};
