const router = require('express').Router();
const { OperatingHours, Room, Reservation } = require('../../models');
const { withAuth } = require('../../utils/auth');

// The `/api/operatingHours` endpoint

// get all operatingHours
router.get('/', async (req, res) => {
  // find all operatingHours
  // be sure to include its associated Category and Tag data
  try {
    const operatingHourData = await OperatingHours.findAll({
      include: [{ model: Room, include: [{ model: Reservation }] }]
    });
    res.status(200).json(operatingHourData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one operatingHour
router.get('/:id', async (req, res) => {
  // find a single operatingHour by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const operatingHourData = await OperatingHours.findByPk(req.params.id, {
      include: [{ model: Room }, { model: Reservation }]
    });

    if (!operatingHourData) {
      res.status(404).json({ message: 'That operatingHour does not exist!' });
      return;
    }

    res.status(200).json(operatingHourData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new operatingHour
router.post('/', withAuth, async (req, res) => {
  try {
    const operatingHourData = await OperatingHours.create({
      ...req.body,
      user_id: req.session.user_id
    });
    // if no operatingHour tags, just respond
    res.status(200).json(operatingHourData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update operatingHour
router.put('/:id', async (req, res) => {
  try {
    // update operatingHour data
    const operatingHourData = await OperatingHours.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!operatingHourData) {
      res.status(404).json({ message: 'That operatingHour does not exist!' });
      return;
    }

    res.status(200).json(operatingHourData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  // delete one operatingHour by its `id` value
  try {
    const operatingHourData = await OperatingHours.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!operatingHourData) {
      res.status(404).json({ message: 'That operatingHour does not exist!' });
      return;
    }

    res.status(200).json(operatingHourData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
