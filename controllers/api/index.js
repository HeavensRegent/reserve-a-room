const router = require('express').Router();
const userRoutes = require('./userRoutes');
<<<<<<< HEAD

router.use('/users', userRoutes);

module.exports = router;
=======
const locationRoutes = require('./locationRoutes');
const operatingHourRoutes = require('./operatingHoursRoutes');
const reservationRoutes = require('./reservationRoutes');
const roleRoutes = require('./roleRoutes');
const roomRoutes = require('./roomRoutes');

router.use('/users', userRoutes);
router.use('/locations', locationRoutes);
router.use('/operatinghours', operatingHourRoutes);
router.use('/reservations', reservationRoutes);
router.use('/roles', roleRoutes);
router.use('/rooms', roomRoutes);

module.exports = router;
>>>>>>> added lint, prettier, package.json and a default server.js
