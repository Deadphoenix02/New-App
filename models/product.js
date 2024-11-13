const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const product = sequelize.define('product',{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = product;