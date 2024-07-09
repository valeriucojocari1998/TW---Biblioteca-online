const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./backend/database.sqlite');

// Create tables and insert initial data
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nume TEXT,
    pret REAL,
    in_stoc BOOLEAN,
    data_creerii DATE,
    autor TEXT,
    categorii TEXT
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
  db.run(`INSERT INTO books (nume, pret, in_stoc, data_creerii, autor, categorii) VALUES 
  ('Book 1', 19.99, 1, '2023-01-15', 'Author 1', 'Fiction'),
  ('Book 2', 24.99, 0, '2023-02-10', 'Author 2', 'Non-Fiction'),
  ('Book 3', 14.99, 1, '2023-03-05', 'Author 3', 'Science'),
  ('Book 4', 9.99, 1, '2023-04-20', 'Author 4', 'Technology'),
  ('Book 5', 29.99, 0, '2023-05-18', 'Author 5', 'Art'),
  ('Book 6', 34.99, 1, '2023-06-22', 'Author 6', 'History'),
  ('Book 7', 12.99, 1, '2023-07-14', 'Author 7', 'Literature'),
  ('Book 8', 17.99, 0, '2023-08-08', 'Author 8', 'Biography'),
  ('Book 9', 22.99, 1, '2023-09-10', 'Author 9', 'Mystery'),
  ('Book 10', 26.99, 1, '2023-10-05', 'Author 10', 'Romance'),
  ('Book 11', 18.99, 0, '2023-11-15', 'Author 11', 'Thriller'),
  ('Book 12', 20.99, 1, '2023-12-12', 'Author 12', 'Horror'),
  ('Book 13', 15.99, 1, '2024-01-20', 'Author 13', 'Adventure'),
  ('Book 14', 21.99, 0, '2024-02-22', 'Author 14', 'Fantasy'),
  ('Book 15', 19.49, 1, '2024-03-19', 'Author 15', 'Drama'),
  ('Book 16', 23.99, 1, '2024-04-25', 'Author 16', 'Poetry'),
  ('Book 17', 27.99, 0, '2024-05-30', 'Author 17', 'Science Fiction'),
  ('Book 18', 16.99, 1, '2024-06-17', 'Author 18', 'Cooking'),
  ('Book 19', 25.99, 1, '2024-07-21', 'Author 19', 'Travel'),
  ('Book 20', 28.99, 0, '2024-08-16', 'Author 20', 'Health')
  
  `);

  db.run(`INSERT INTO users (username, password) VALUES 
    ('user1', '$2a$10$5sZJFIobGhtT2NeiBfXvkeQp5NprJejZnH9rPPA3r5Ec13bXg3z2K'), -- password: user1pass
    ('user2', '$2a$10$B5wC2yW5dQ1j2zU0sHZ4OuvjGZ5RPGhg9Kp4F.u9n69m6dYwTpzri')  -- password: user2pass
  `);
});

module.exports = db;
