const User = require('./User');
const Location = require('./Location');
const Room = require('./Room');
const OperatingHours = require('./OperatingHours');
const Reservation = require('./Reservation');
const Role = require('./Role');
const UserRole = require('./UserRole');

User.hasMany(Reservation, {
  foreignKey: 'userId'
});

Reservation.belongsTo(User, {
  foreignKey: 'userId'
})

Room.hasMany(Reservation, {
  foreignKey: 'roomId'
});

User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: 'userId'
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: 'roleId'
});

Location.hasMany(Room, {
  foreignKey: 'locationId'
});

Room.belongsTo(Location, {
  foreignKey: 'locationId'
});

Room.hasMany(OperatingHours, {
  foreignKey: 'roomId'
});

module.exports = {
  User,
  Location,
  Room,
  OperatingHours,
  Reservation,
  Role,
  UserRole
};
