const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> added lint, prettier, package.json and a default server.js
