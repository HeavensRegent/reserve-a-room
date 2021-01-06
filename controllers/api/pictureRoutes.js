const router = require('express').Router();
const uploadFile = require('../../utils/upload');
const { Picture } = require('../../models');
const { withAuth } = require('../../utils/auth');
const fs = require('fs');

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

router.post('/upload', uploadFile.single('file'), async (req, res) => {
  try {
    console.log(req.file);

    if (req.file === undefined) {
      return res.send('You must select a file.');
    }

    let picture = await Picture.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        `${__dirname}/../../public/imgs/${req.file.filename}`
      ),
      roomId: req.body.roomId || null,
      locationId: req.body.locationId || null
    });

    fs.writeFileSync(
      `${__dirname}/../../public/imgs/tmp/${picture.name}`,
      picture.data
    );

    return res.status(200).json({ message: 'File has been uploaded.' });
  } catch (err) {
    return res.send(`Error when trying to upload images: ${err}`);
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
