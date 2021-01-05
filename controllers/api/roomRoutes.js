const router = require('express').Router();
const { Room, Location, Reservation } = require('../../models');
const withAuth = require('../../utils/auth');
const Sequelize = require('sequelize');

// The `/api/rooms` endpoint

// get all rooms
router.get('/', async (req, res) => {
  // find all rooms
  // be sure to include its associated Category and Tag data
  try {
    const roomData = await Room.findAll({
      include: [{ model: Location }, { model: Reservation }]
    });
    res.status(200).json(roomData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one room
router.get('/:id', async (req, res) => {
  // find a single room by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const roomData = await Room.findByPk(req.params.id, {
      include: [{ model: Location }, { model: Reservation }]
    });

    if (!roomData) {
      res.status(404).json({ message: 'That room does not exist!' });
      return;
    }

    res.status(200).json(roomData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new room
router.post('/', async (req, res) => {
  try {
    const roomData = await Room.create({
      ...req.body,
      user_id: req.session.user_id
    });
    // if no room tags, just respond
    res.status(200).json(roomData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// -------matches with /api/rooms/filter
router.post('/filter', async (req, res) => {
  console.log('-------filter--------');
  console.log(req.body);
  try {
    let { queryParams, filterData } = req.body;
    let { limit, orderby, order } = queryParams || {}; // allow queryParams to be undefined
    console.log({ queryParams, filterData });
    let whereAttributes = filterData.reduce((acc, { id, value }) => {
      console.log({ id, value });
      acc[id] = value;
      return acc;
    }, {});
    const roomData = await Room.findAndCountAll({
      order: [[orderby, order]],
      limit: parseInt(limit),
      subQuery: false,
      attributes: {
        include: [],
        exclude: []
      },
      include: [
        {
          model: Location
          // as: 'locations'
        }
      ],
      ...(Object.keys(whereAttributes).length > 0 && {
        where: { [Sequelize.Op.or]: [whereAttributes] }
      })
    });
    console.log({ roomData });
    // if no room tags, just respond
    res.status(200).json({
      ok: true,
      roomData
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
// ----------------
// update room
router.put('/:id', async (req, res) => {
  try {
    // update room data
    const roomData = await Room.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!roomData) {
      res.status(404).json({ message: 'That room does not exist!' });
      return;
    }

    res.status(200).json(roomData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  // delete one room by its `id` value
  try {
    const roomData = await Room.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });

    if (!roomData) {
      res.status(404).json({ message: 'That room does not exist!' });
      return;
    }

    res.status(200).json(roomData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
