const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Train = require('./Train'); 

//booking is a table/model in db inside config/database
const Booking = sequelize.define('Booking', {
  bookingId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  trainId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  seatStatus: {
    type: DataTypes.ENUM('vacant', 'booked'),
    defaultValue: 'vacant',
  },
});

Booking.belongsTo(Train, { foreignKey: 'trainId', targetKey: 'trainId' });



module.exports = Booking;
