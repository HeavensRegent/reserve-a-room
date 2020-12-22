const router = require('express').Router();
const { Reservation, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    console.log("called the home route which should render the homepage within the main page");
    const reservationData = await Reservation.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const reservations = reservationData.map((reservation) => reservation.get({ plain: true }));

    console.log("here are the reservations", reservations);
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      reservations, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


router.get('/reservations', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    console.log("called the reservation route which should render the homepage within the main page");
    const reservationData = await Reservation.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const reservations = reservationData.map((reservation) => reservation.get({ plain: true }));

    console.log("here are the reservations", reservations);
    // Pass serialized data and session flag into template
    res.render('calendar', { 
      reservations, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

module.exports = router;
