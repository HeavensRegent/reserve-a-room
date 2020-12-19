const path = require('path');
const express = require('express');
const session = require('express-session');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const {
  User,
  Location,
  Room,
  OperatingHours,
  Reservation,
  Role,
  UserRole
} = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
