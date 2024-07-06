const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./backend/database.sqlite');

exports.createOrder = (order, callback) => {
  const { user_id, order_details } = order;
  db.run(
    'INSERT INTO orders (user_id, order_details) VALUES (?, ?)',
    [user_id, order_details],
    function (err) {
      callback(err, { id: this.lastID, ...order });
    }
  );
};

exports.getOrdersByUserId = (user_id, callback) => {
  db.all('SELECT * FROM orders WHERE user_id = ?', [user_id], (err, rows) => {
    callback(err, rows);
  });
};
