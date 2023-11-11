const Sequelize = require('sequelize')

const sequelize = require('../util/database');

const Expenses = sequelize.define('expense', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  expdesc: Sequelize.STRING,
  expamount: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  exptype:{
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Expenses