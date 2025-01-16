const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Device = sequelize.define('Device', {
  device_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
  },
  serial_number: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  vulnerability_score: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 100,
    },
  },
});

module.exports = Device;