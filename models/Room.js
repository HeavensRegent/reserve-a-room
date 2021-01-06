const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Room extends Model {}

Room.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    size: {
      type: DataTypes.STRING
    },
    amenities: {
      type: DataTypes.STRING
    },
    amenities_bathroom: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    amenities_tables: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    amenities_chairs: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    amenities_soundSystem: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    amenities_hasStage: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    activities_basketball: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    activities_volleyball: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    activities_dodgeball: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // as: 'locations',
        model: 'location',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'room'
  }
);

module.exports = Room;
