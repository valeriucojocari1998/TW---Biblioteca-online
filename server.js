const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const sass = require('sass');
const { isAuthenticated } = require('./backend/middleware/authMiddleware');
const bookController = require('./backend/controllers/bookController');
const orderController = require('./backend/controllers/orderController');
const userController = require('./backend/controllers/userController');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend', 'public')));
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

// SCSS Compilation
const obGlobal = {
  folderScss: path.join(__dirname, 'frontend', 'public', 'scss'),
  folderCss: path.join(__dirname, 'frontend', 'public', 'css'),
  backupFolder: path.join(__dirname, 'backup')
};

function compileazaScss(caleScss, caleCss) {
  let cale_abs_scss = path.isAbsolute(caleScss) ? caleScss : path.join(obGlobal.folderScss, caleScss);
  let cale_abs_css = caleCss ? (path.isAbsolute(caleCss) ? caleCss : path.join(obGlobal.folderCss, caleCss)) : path.join(obGlobal.folderCss, path.basename(caleScss, '.scss') + '.css');

  let backupFile = path.join(obGlobal.backupFolder, path.relative(obGlobal.folderCss, cale_abs_css));

  if (!fs.existsSync(path.dirname(backupFile))) {
    fs.mkdirSync(path.dirname(backupFile), { recursive: true });
  }

  if (fs.existsSync(cale_abs_css)) {
    fs.copyFileSync(cale_abs_css, backupFile);
  }

  let result = sass.renderSync({ file: cale_abs_scss });
  fs.writeFileSync(cale_abs_css, result.css);
}

// Compile all SCSS files initially
fs.readdirSync(obGlobal.folderScss).forEach(file => {
  if (file.endsWith('.scss')) {
    compileazaScss(file);
  }
});

// Watch SCSS files for changes
fs.watch(obGlobal.folderScss, (eventType, filename) => {
  if (filename.endsWith('.scss')) {
    compileazaScss(filename);
  }
});

// Routes
app.get('/', (req, res) => res.render('home'));
app.get('/about', (req, res) => res.render('about'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/cart', (req, res) => res.render('cart'));
app.get('/checkout', (req, res) => res.render('checkout'));
app.get('/books', bookController.getAllBooks);
app.get('/book/:id', bookController.getBookById);
app.get('/register', (req, res) => res.render('register'));
app.get('/login', (req, res) => res.render('login'));
app.get('/orders', isAuthenticated, orderController.getOrders);
app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);
app.get('/logout', userController.logoutUser);

app.get('/js/filters.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'public', 'js', 'filters.js'));
});

// Initialize the database
require('./backend/database');

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
