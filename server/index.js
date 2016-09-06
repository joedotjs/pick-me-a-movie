var express = require('express');
var chalk = require('chalk');
var path = require('path');
var databaseConnection = require('./database').db;
var app = express();

app.use(express.static(path.join(__dirname, '../node_modules')));
app.use(express.static(path.join(__dirname, '../browser')));

app.use('/movies', require('./movies-router'));

app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

databaseConnection.sync()
    .then(function () {
        app.listen(1337, function () {
            console.log(chalk.blue('Server is listening on port'), chalk.magenta(1337));
        });
    });

