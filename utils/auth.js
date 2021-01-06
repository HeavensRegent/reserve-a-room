const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

const isManager = (req, res, next) => {
  // If the user is not manager, redirect the request to the homepage route
  if ((req.session.user_role.toLowerCase() === 'manager')||(req.session.user_role.toLowerCase() === 'administrator')) {
    next();
  } else {
    res.redirect('/');
  }
};

const isAdmin = (req, res, next) => {
  // If the user is not admin, redirect the request to the homepage route
  if (req.session.user_role.toLowerCase() === 'administrator') {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = {
  withAuth,
  isManager,
  isAdmin
};
