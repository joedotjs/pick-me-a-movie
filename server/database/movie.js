var Sequelize = require('sequelize');
var databaseConnection = require('./_db');

var MovieModel = databaseConnection.define('movie', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    watched: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    photo: {
        type: Sequelize.STRING
    }
});

module.exports = MovieModel;