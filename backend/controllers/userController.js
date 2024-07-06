const userModel = require('../models/User');
const bcrypt = require('bcryptjs');

exports.registerUser = (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).send('Error registering user');
    } else {
      userModel.createUser({ username, password: hashedPassword }, (err, user) => {
        if (err) {
          req.flash('error_msg', 'Error registering user');
          res.redirect('/register');
        } else {
          req.flash('success_msg', 'User registered successfully');
          res.redirect('/login');
        }
      });
    }
  });
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  userModel.getUserByUsername(username, (err, user) => {
    if (err || !user) {
      req.flash('error_msg', 'Invalid username or password');
      res.redirect('/login');
    } else {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          req.flash('error_msg', 'Invalid username or password');
          res.redirect('/login');
        } else {
          req.session.user = user;
          res.redirect('/');
        }
      });
    }
  });
};

exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send('Error logging out');
    } else {
      res.redirect('/login');
    }
  });
};
