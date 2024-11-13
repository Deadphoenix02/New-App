const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const user = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        allowIncreament: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    emailId: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = user;