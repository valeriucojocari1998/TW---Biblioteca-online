const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_jwt_secret_key';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
const db = new sqlite3.Database('./db/library.db');

// Routes
const booksRouter = require('./routes/books');
const checkoutRouter = require('./routes/checkout');
const contactsRouter = require('./routes/contacts');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');

app.use('/api/books', booksRouter(db));
app.use('/api/checkout', checkoutRouter(db, nodemailer));
app.use('/api/contacts', contactsRouter(nodemailer));
app.use('/api/users', usersRouter(db, bcrypt, jwt, SECRET_KEY));
app.use('/api/orders', ordersRouter(db, jwt, SECRET_KEY));

// Serve HTML files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/bookstore', (req, res) => res.sendFile(path.join(__dirname, 'public', 'bookstore.html')));
app.get('/checkout', (req, res) => res.sendFile(path.join(__dirname, 'public', 'checkout.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public', 'contact.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'public', 'about.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'public', 'register.html')));
app.get('/orders', (req, res) => res.sendFile(path.join(__dirname, 'public', 'orders.html')));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
