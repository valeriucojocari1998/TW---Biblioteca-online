const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./backend/database.sqlite');

exports.createUser = (user, callback) => {
  const { username, password } = user;
  db.run(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, password],
    function (err) {
      callback(err, { id: this.lastID, ...user });
    }
  );
};

exports.getUserByUsername = (username, callback) => {
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    callback(err, row);
  });
};
