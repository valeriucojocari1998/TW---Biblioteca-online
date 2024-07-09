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
    categorii TEXT,
    image TEXT
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
  db.run(`INSERT INTO books (nume, pret, in_stoc, data_creerii, autor, categorii, image) VALUES 
  ('The Great Gatsby', 10.99, 1, '1925-04-10', 'F. Scott Fitzgerald', 'Fiction', 'https://lacountylibrary.org/wp-content/uploads/2020/11/More-bks-URL.png'),
  ('To Kill a Mockingbird', 7.99, 1, '1960-07-11', 'Harper Lee', 'Fiction', 'https://lacountylibrary.org/wp-content/uploads/2020/11/More-bks-URL.png'),
  ('1984', 8.99, 1, '1949-06-08', 'George Orwell', 'Science Fiction', 'https://lacountylibrary.org/wp-content/uploads/2020/11/More-bks-URL.png'),
  ('The Catcher in the Rye', 6.99, 0, '1951-07-16', 'J.D. Salinger', 'Fiction', 'https://lacountylibrary.org/wp-content/uploads/2020/11/More-bks-URL.png'),
  ('Pride and Prejudice', 9.99, 1, '1813-01-28', 'Jane Austen', 'Romance', 'https://lacountylibrary.org/wp-content/uploads/2020/11/More-bks-URL.png'),
  ('The Hobbit', 12.99, 1, '1937-09-21', 'J.R.R. Tolkien', 'Fantasy', 'https://lacountylibrary.org/wp-content/uploads/2020/11/More-bks-URL.png'),
  ('Moby Dick', 15.99, 0, '1851-10-18', 'Herman Melville', 'Adventure', 'https://lacountylibrary.org/wp-content/uploads/2020/11/More-bks-URL.png'),
  ('War and Peace', 20.99, 1, '1869-01-01', 'Leo Tolstoy', 'Historical Fiction', 'https://lacountylibrary.org/wp-content/uploads/2020/11/More-bks-URL.png'),
  ('Hamlet', 5.99, 1, '1603-01-01', 'William Shakespeare', 'Drama', 'https://lacountylibrary.org/wp-content/uploads/2020/11/More-bks-URL.png'),
  ('The Odyssey', 14.99, 1, '800-01-01', 'Homer', 'Epic', 'https://lacountylibrary.org/wp-content/uploads/2020/11/More-bks-URL.png')
  
  `);

  db.run(`INSERT INTO users (username, password) VALUES 
    ('user1', '$2a$10$5sZJFIobGhtT2NeiBfXvkeQp5NprJejZnH9rPPA3r5Ec13bXg3z2K'), -- password: user1pass
    ('user2', '$2a$10$B5wC2yW5dQ1j2zU0sHZ4OuvjGZ5RPGhg9Kp4F.u9n69m6dYwTpzri')  -- password: user2pass
  `);
});

module.exports = db;
