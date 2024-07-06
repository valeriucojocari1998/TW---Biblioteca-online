const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const path = require('path');
const { isAuthenticated } = require('./backend/middleware/authMiddleware');
const bookController = require('./backend/controllers/bookController');
const orderController = require('./backend/controllers/orderController');
const userController = require('./backend/controllers/userController');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.user = req.session.user || null;
  next();
});

// Set view engine
app.set('views', path.join(__dirname, 'frontend', 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => res.render('home'));
app.get('/about', (req, res) => res.render('about'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/cart', (req, res) => res.render('cart'));
app.get('/checkout', (req, res) => res.render('checkout'));
app.get('/bookstore', bookController.getAllBooks);
app.get('/register', (req, res) => res.render('register'));
app.get('/login', (req, res) => res.render('login'));
app.get('/orders', isAuthenticated, orderController.getOrders);
app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);
app.get('/logout', userController.logoutUser);

// Initialize the database
require('./backend/database');

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
