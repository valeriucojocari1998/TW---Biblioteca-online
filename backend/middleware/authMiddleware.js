exports.isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    req.flash('error_msg', 'Please log in to view this resource');
    res.redirect('/login');
  }
};
