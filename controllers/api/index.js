const router = require('express').Router();
const userRoutes = require('./userRoutes');
const locationRoutes = require('./locationRoutes');
const operatingHourRoutes = require('./operatingHoursRoutes');
const reservationRoutes = require('./reservationRoutes');
const roleRoutes = require('./roleRoutes');
const roomRoutes = require('./roomRoutes');
const pictureRoutes = require('./pictureRoutes');

router.use('/users', userRoutes);
router.use('/locations', locationRoutes);
router.use('/operatinghours', operatingHourRoutes);
router.use('/reservations', reservationRoutes);
router.use('/roles', roleRoutes);
router.use('/rooms', roomRoutes);
router.use('/pictures', pictureRoutes);

module.exports = router;
