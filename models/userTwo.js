//this sile is as per the udemy video users.js is for the appointment app
const Sequelize = require('sequelize')

const sequelize = require('../util/database');

const UserTwo = sequelize.define('usersTwo', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING
})

module.exports = UserTwo