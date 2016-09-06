var express = require('express');
var moviesSubRouter = express.Router();
module.exports = moviesSubRouter;

var Movie = require('../database').Movie;

moviesSubRouter.get('/', function (req, res, next) {
    Movie.findAll({})
        .then(function (allMovies) {
            res.send(allMovies);
        })
        .catch(next);
});

moviesSubRouter.post('/', function (req, res, next) {
    Movie.create({
        name: req.body.name
    })
        .then(function (newlyCreatedMovie) {
            res.send(newlyCreatedMovie);
        })
        .catch(next);
});

moviesSubRouter.delete('/:specificMovieId', function (req, res, next) {
    Movie.destroy({
        where: {
            id: req.params.specificMovieId
        }
    })
        .then(function () {
            res.sendStatus(204);
        })
        .catch(next);
});

moviesSubRouter.put('/:movieIdToUpdate', function (req, res, next) {
    Movie.findById(req.params.movieIdToUpdate)
        .then(function (oneMovie) {
            oneMovie.watched = req.body.watched;
            return oneMovie.save(); // Persist changes to .watched in database
        })
        .then(function () {
            res.sendStatus(204);
        })
        .catch(next);
});