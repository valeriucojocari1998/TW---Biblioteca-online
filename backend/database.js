const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./backend/database.sqlite');

// Create tables and insert initial data
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    order_details TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);

  // Insert initial data
  db.run(`INSERT INTO books (title, author, category, price) VALUES 
    ('Book 1', 'Author 1', 'Category 1', 9.99),
    ('Book 2', 'Author 2', 'Category 2', 12.99),
    ('Book 3', 'Author 3', 'Category 3', 8.99),
    ('Book 4', 'Author 4', 'Category 4', 15.99),
    ('Book 5', 'Author 5', 'Category 5', 7.99)
  `);

  db.run(`INSERT INTO users (username, password) VALUES 
    ('user1', '$2a$10$5sZJFIobGhtT2NeiBfXvkeQp5NprJejZnH9rPPA3r5Ec13bXg3z2K'), -- password: user1pass
    ('user2', '$2a$10$B5wC2yW5dQ1j2zU0sHZ4OuvjGZ5RPGhg9Kp4F.u9n69m6dYwTpzri')  -- password: user2pass
  `);
});

module.exports = db;
