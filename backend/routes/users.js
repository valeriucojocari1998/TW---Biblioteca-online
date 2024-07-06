const express = require('express');
const router = express.Router();

module.exports = (db, bcrypt, jwt, SECRET_KEY) => {
  router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });

  router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (!user || !bcrypt.compareSync(password, user.password)) {
        res.status(401).json({ message: 'Invalid username or password' });
        return;
      }

      const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    });
  });

  return router;
};
