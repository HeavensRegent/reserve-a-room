const router = require('express').Router();
const { Reservation, Location, Room } = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/reservations` endpoint

// get all reservations
router.get('/', async (req, res) => {
  // find all reservations
  // be sure to include its associated Category and Tag data
  try {
    const reservationData = await Reservation.findAll({
      include: [{ model: Room, include: [{ model: Location }] }]
    });
    res.status(200).json(reservationData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one reservation
router.get('/:id', async (req, res) => {
  // find a single reservation by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const reservationData = await Reservation.findByPk(req.params.id, {
      include: [{ model: Location }, { model: Room }]
    });

    if (!reservationData) {
      res.status(404).json({ message: 'That reservation does not exist!' });
      return;
    }

    res.status(200).json(reservationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new reservation
router.post('/', withAuth, async (req, res) => {
  try {
    const reservationData = await Reservation.create({
      ...req.body,
      user_id: req.session.user_id
    });
    // if no reservation tags, just respond
    res.status(200).json(reservationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update reservation
router.put('/:id', async (req, res) => {
  try {
    // update reservation data
    const reservationData = await Reservation.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!reservationData) {
      res.status(404).json({ message: 'That reservation does not exist!' });
      return;
    }

    res.status(200).json(reservationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  // delete one reservation by its `id` value
  try {
    const reservationData = await Reservation.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });

    if (!reservationData) {
      res.status(404).json({ message: 'That reservation does not exist!' });
      return;
    }

    res.status(200).json(reservationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
