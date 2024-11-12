//using sequelize
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

//train is user model that is sql table 
const Train = sequelize.define('Train', {
  trainName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trainId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Train;
