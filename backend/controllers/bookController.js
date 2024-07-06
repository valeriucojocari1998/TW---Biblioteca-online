const bookModel = require('../models/Book');

exports.getAllBooks = (req, res) => {
  bookModel.getAllBooks((err, books) => {
    if (err) {
      res.status(500).send('Error retrieving books');
    } else {
      res.render('bookstore', { books });
    }
  });
};
