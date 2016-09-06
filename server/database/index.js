var databaseConnection = require('./_db');
var MovieModel = require('./movie');

module.exports = {
    db: databaseConnection,
    Movie: MovieModel
};