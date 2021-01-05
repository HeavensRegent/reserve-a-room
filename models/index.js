const User = require('./User');
const Location = require('./Location');
const Room = require('./Room');
const OperatingHours = require('./OperatingHours');
const Reservation = require('./Reservation');
const Role = require('./Role');
const UserRole = require('./UserRole');
const Picture = require('./Picture');

User.hasMany(Reservation, {
  foreignKey: 'userId'
});

Reservation.belongsTo(User, {
  foreignKey: 'userId'
});

Room.hasMany(Reservation, {
  foreignKey: 'roomId'
});

Reservation.belongsTo(User, {
  foreignKey: 'userId'
});

Reservation.belongsTo(Room, {
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

Location.hasMany(Picture, {
  foreignKey: 'locationId'
});

Room.hasMany(Picture, {
  foreignKey: 'roomId'
});

Room.belongsTo(Location, {
  foreignKey: 'locationId'
});

Room.hasMany(OperatingHours, {
  foreignKey: 'roomId'
});

OperatingHours.belongsTo(Room, {
  foreignKey: 'roomId'
});

module.exports = {
  User,
  Location,
  Room,
  OperatingHours,
  Reservation,
  Role,
  UserRole,
  Picture
};
