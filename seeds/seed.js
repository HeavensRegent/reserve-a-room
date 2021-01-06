const sequelize = require('../config/connection');
const {
  User,
  Location,
  Room,
  OperatingHours,
  Reservation,
  Role,
  UserRole
} = require('../models');

const userData = require('./userData.json');
const locationData = require('./locationData.json');
const roomData = require('./roomData.json');
const operatingHoursData = require('./operatingHoursData.json');
const reservationData = require('./reservationData.json');
const roleData = require('./roleData.json');
const userRoleData = require('./userRoleData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });

  const roles = await Role.bulkCreate(roleData, {
    individualHooks: true,
    returning: true
  });

  const locations = [];
  for (const location of locationData) {
    locations.push(
      await Location.create(
        {
          ...location,
          managedBy: users[Math.floor(Math.random() * users.length)].id
        },
        {
          returning: true
        }
      )
    );
  }

  const rooms = [];
  for (const room of roomData) {
    rooms.push(
      await Room.create(
        {
          ...room,
          locationId: locations[Math.floor(Math.random() * locations.length)].id
        },
        {
          returning: true
        }
      )
    );
  }

  for (const operatingHours of operatingHoursData) {
    await OperatingHours.create({
      ...operatingHours,
      roomId: rooms[Math.floor(Math.random() * rooms.length)].id
    });
  }

  for (const reservation of reservationData) {
    await Reservation.create({
      ...reservation,
      userId: users[Math.floor(Math.random() * users.length)].id,
      roomId: rooms[Math.floor(Math.random() * rooms.length)].id
    });
  }

  for (const [index, userRole] of userRoleData.entries()) {
    await UserRole.create({
      ...userRole,
      roleId: roles[Math.floor(Math.random() * roles.length)].id,
      userId: users[index].id
    });
  }

  process.exit(0);
};

seedDatabase();
