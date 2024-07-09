const db = require('../database');

exports.getAllBooks = (req, res) => {
  const query = "SELECT * FROM books";
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.render('bookstore', { books: rows });
  });
};

exports.getBookById = (req, res) => {
  const bookId = req.params.id;
  const query = "SELECT * FROM books WHERE id = ?";
  db.get(query, [bookId], (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.render('book', { book: row });
  });
};
