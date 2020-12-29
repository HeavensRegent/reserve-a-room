const router = require('express').Router();

const apiRoutes = require('./api');
const browserRoutes = require('./browser');

router.use('/', browserRoutes);
router.use('/api', apiRoutes);

module.exports = router;
