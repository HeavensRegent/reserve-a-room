const router = require('express').Router();
const { Role, User } = require('../../models');
const { withAuth } = require('../../utils/auth');

// The `/api/roles` endpoint

// get all roles
router.get('/', async (req, res) => {
  // find all roles
  // be sure to include its associated Category and Tag data
  try {
    const roleData = await Role.findAll({
      include: [{ model: User }]
    });
    res.status(200).json(roleData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one role
router.get('/:id', async (req, res) => {
  // find a single role by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const roleData = await Role.findByPk(req.params.id, {
      include: [{ model: User }]
    });

    if (!roleData) {
      res.status(404).json({ message: 'That role does not exist!' });
      return;
    }

    res.status(200).json(roleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new role
router.post('/', withAuth, async (req, res) => {
  try {
    const roleData = await Role.create({
      ...req.body,
      user_id: req.session.user_id
    });
    // if no role tags, just respond
    res.status(200).json(roleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update role
router.put('/:id', async (req, res) => {
  try {
    // update role data
    const roleData = await Role.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!roleData) {
      res.status(404).json({ message: 'That role does not exist!' });
      return;
    }

    res.status(200).json(roleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  // delete one role by its `id` value
  try {
    const roleData = await Role.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!roleData) {
      res.status(404).json({ message: 'That role does not exist!' });
      return;
    }

    res.status(200).json(roleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
