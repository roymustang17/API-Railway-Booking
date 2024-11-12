//index file to export all tables/model from models folder 
//config required to pass details
require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const User = require('./User')(sequelize, Sequelize);
const Train = require('./Train');
const Booking=require('./Booking',sequelize,Sequelize);

module.exports = {
  sequelize,
  User,
  Train,
  Booking,
};