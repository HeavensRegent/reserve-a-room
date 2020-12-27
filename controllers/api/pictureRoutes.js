const router = require('express').Router();
const { Picture } = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/pictures` endpoint

// get all pictures
router.get('/', async (req, res) => {
  // find all pictures
  // be sure to include its associated Category and Tag data
  try {
    const pictureData = await Picture.findAll();
    res.status(200).json(pictureData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one picture
router.get('/:id', async (req, res) => {
  // find a single picture by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const pictureData = await Picture.findByPk(req.params.id);

    if (!pictureData) {
      res
        .status(404)
        .json({ message: `That picture (${req.params.id}) does not exist!` });
      return;
    }

    res.status(200).json(pictureData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new picture
router.post('/', async (req, res) => {
  try {
    const pictureData = await Picture.create({
      ...req.body,
      user_id: req.session.user_id
    });
    // if no picture tags, just respond
    res.status(200).json(pictureData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update picture
router.put('/:id', async (req, res) => {
  try {
    // update picture data
    const pictureData = await Picture.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!pictureData) {
      res.status(404).json({ message: 'That picture does not exist!' });
      return;
    }

    res.status(200).json(pictureData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  // delete one picture by its `id` value
  try {
    const pictureData = await Picture.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!pictureData) {
      res.status(404).json({ message: 'That picture does not exist!' });
      return;
    }

    res.status(200).json(pictureData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
