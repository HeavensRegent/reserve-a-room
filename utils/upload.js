const multer = require('multer');

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Please upload only images.', false);
  }
};

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../public/imgs/`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-image-${file.originalname}`);
  }
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;
