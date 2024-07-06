const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./backend/database.sqlite');

exports.getAllBooks = (callback) => {
  db.all('SELECT * FROM books', [], (err, rows) => {
    callback(err, rows);
  });
};

exports.createBook = (book, callback) => {
  const { title, author, category, price } = book;
  db.run(
    'INSERT INTO books (title, author, category, price) VALUES (?, ?, ?, ?)',
    [title, author, category, price],
    function (err) {
      callback(err, { id: this.lastID, ...book });
    }
  );
};
