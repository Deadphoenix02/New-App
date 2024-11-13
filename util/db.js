const Sequelize = require('sequelize');

const sequelize = new Sequelize ('db1', 'bat', 'batman', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;