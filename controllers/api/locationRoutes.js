const router = require('express').Router();
const { Location, Room, Reservation } = require('../../models');
const { withAuth } = require('../../utils/auth.js');

// The `/api/locations` endpoint

// get all locations
router.get('/', async (req, res) => {
  // find all locations
  // be sure to include its associated Category and Tag data
  try {
    const locationData = await Location.findAll({
      include: [{ model: Room, include: [{ model: Reservation }] }]
    });
    res.status(200).json(locationData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one location
router.get('/:id', async (req, res) => {
  // find a single location by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const locationData = await Location.findByPk(req.params.id, {
      include: [{ model: Room }, { model: Reservation }]
    });

    if (!locationData) {
      res
        .status(404)
        .json({ message: `That location (${req.params.id}) does not exist!` });
      return;
    }

    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new location
router.post('/', async (req, res) => {
  try {
    const locationData = await Location.create({
      ...req.body,
      user_id: req.session.user_id
    });
    // if no location tags, just respond
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update location
router.put('/:id', async (req, res) => {
  try {
    delete req.body.managedBy;
    // update location data
    const locationData = await Location.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!locationData) {
      res.status(404).json({ message: 'That location does not exist!' });
      return;
    }

    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  // delete one location by its `id` value
  try {
    const locationData = await Location.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!locationData) {
      res.status(404).json({ message: 'That location does not exist!' });
      return;
    }

    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
