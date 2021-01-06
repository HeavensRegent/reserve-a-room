const router = require('express').Router();
const userRoutes = require('./userRoutes');
const { withAuth } = require('../../utils/auth');
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
      my_role: req.session.my_role
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
          attributes: ['name']
        }
      ]
    });

    // Serialize data so the template can read it
    const reservations = reservationData.map((reservation) =>
      reservation.get({ plain: true })
    );

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

// Get list of all reservations for all users
router.get('/reservations/:roomId', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    // const reservationData = await Reservation.findAll({
    //   where: {
    //     roomId: req.params.roomId,
    //   },
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name'],
    //     },
    //   ],
    // });

    // Serialize data so the template can read it
    // const reservations = reservationData.map((reservation) => reservation.get({ plain: true }));
    let roomId = req.params.roomId;
    console.log('object is', roomId);
    // Pass serialized data and session flag into template
    res.render('calendar', {
      roomId,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/room/:id/upload', withAuth, async (req, res) => {
  try {
    const roomData = await Room.findByPk(req.params.id);
    if (roomData) {
      const room = roomData.get({ plain: true });

      return res.render('upload', {
        ...room,
        logged_in: req.session.logged_in,
        isRoom: true
      });
    }
    return res.status(404).json({ message: 'That room does not exist' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/location/:id/upload', withAuth, async (req, res) => {
  try {
    const locationData = await Location.findByPk(req.params.id);
    if (locationData) {
      const location = locationData.get({ plain: true });

      return res.render('upload', {
        ...location,
        logged_in: req.session.logged_in,
        isLocation: true
      });
    }
    return res.status(404).json({ message: 'That location does not exist' });
  } catch (err) {
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
  } else {
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
