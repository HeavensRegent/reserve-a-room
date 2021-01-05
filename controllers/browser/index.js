const router = require('express').Router();
const userRoutes = require('./userRoutes');

const { Room, Location, Reservation, User } = require('../../models');

// Splitting browser routes into separate files
router.use('/users', userRoutes);


// Home Page
router.get('/', async (req, res) => {
  try {
    // Get all rooms and JOIN with location data
    const roomData = await Room.findAll({
      include: [
        {
          model: Location,
          // attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const rooms = roomData.map((room) => room.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      rooms,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in,
      user_role: req.session.user_role
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get list of all reservations for all users
router.get('/reservations', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
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

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect(`/users/${req.session.user_id}`);
    return;
  }
  res.render('login');
});

// Logout Page
router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).redirect('/');
    });
  }else{
    res.status(204).redirect('/');
  }
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect(`/users/${req.session.user_id}`);
    return;
  }
  res.render('signup');
});

module.exports = router;
