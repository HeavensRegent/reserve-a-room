const router = require('express').Router();
const { Reservation, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Home Page
router.get('/', async (req, res) => {
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
    res.render('homepage', {
      reservations,
      logged_in: req.session.logged_in
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

// TODO: Replace this method
router.get('project/:id', async (req, res) => {
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
      include: [{ model: Reservation }],
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
    res.redirect('/profile');
    return;
  }
  res.render('signup');
});

module.exports = router;
