var Sequelize = require('sequelize');
var databaseConnection = new Sequelize('postgres://localhost:5432/pick-me-a-movie');
module.exports = databaseConnection;