var imdb = require('imdb-api');
var database = require('./server/database');
var Movie = database.Movie;
var Promise = require('bluebird');

var getMovieFromImdb = function (movieName) {
    return new Promise(function (resolve, reject) {
        imdb.getReq({ name: movieName }, function (err, value) {
            if (err) reject(err);
            resolve(value);
        });
    });
};

var moviesToSeed = [
    'The Shawshank Redemption',
    'The Godfather',
    'The Godfather: Part II',
    'Pulp Fiction',
    'Inception',
    'Schindler\'s List',
    '12 Angry Men',
    'One Flew Over the Cuckoo\'s Nest',
    'The Dark Knight',
    'Star Wars: Episode V - The Empire Strikes Back',
    'The Lord of the Rings: The Return of the King',
    'Goodfellas',
    'Casablanca',
    'Fight Club',
    'The Lord of the Rings: The Fellowship of the Ring',
    'Rear Window',
    'Raiders of the Lost Ark',
    'Toy Story 3',
    'Psycho',
    'The Usual Suspects',
    'The Matrix',
    'The Silence of the Lambs',
    'Se7en',
    'Memento',
    'It\'s a Wonderful Life',
    'The Lord of the Rings: The Two Towers',
    'Sunset Blvd.',
    'Forrest Gump',
    'Léon',
    'Citizen Kane',
    'Apocalypse Now',
    'North by Northwest',
    'American Beauty',
    'American History X',
    'Taxi Driver',
    'Terminator 2: Judgment Day',
    'Saving Private Ryan',
    'Vertigo',
    'Alien',
    'WALL·E',
    'Lawrence of Arabia',
    'The Shining',
    'Paths of Glory',
    'A Clockwork Orange',
    'Double Indemnity',
    'To Kill a Mockingbird',
    'The Pianist',
    'The Departed',
    'City Lights',
    'Aliens',
    'Eternal Sunshine of the Spotless Mind',
    'Requiem for a Dream',
    'Das Boot',
    'The Third Man',
    'L.A. Confidential',
    'Reservoir Dogs',
    'Chinatown',
    'The Treasure of the Sierra Madre',
    'Modern Times',
    'Monty Python and the Holy Grail',
    'La vita è bella',
    'Back to the Future',
    'The Prestige',
    'Raging Bull',
    'Singin\' in the Rain',
    'Some Like It Hot',
    'The Bridge on the River Kwai',
    'Rashômon',
    'All About Eve',
    'Amadeus',
    'Once Upon a Time in America',
    'The Green Mile',
    'Full Metal Jacket',
    'Inglourious Basterds',
    '2001: A Space Odyssey',
    'The Great Dictator',
    'Braveheart',
    'The Apartment',
    'Up',
    'Der Untergang',
    'Gran Torino',
    'Metropolis',
    'The Sting',
    'Gladiator',
    'The Maltese Falcon',
    'Unforgiven',
    'Sin City',
    'The Elephant Man',
    'Mr. Smith Goes to Washington',
    'On the Waterfront',
    'Indiana Jones and the Last Crusade',
    'Star Wars: Episode VI - Return of the Jedi',
    'Rebecca',
    'The Great Escape',
    'Die Hard',
    'Batman Begins',
    'Jaws',
    'Hotel Rwanda',
    'Slumdog Millionaire',
    'Blade Runner',
    'Fargo',
    'No Country for Old Men',
    'Heat',
    'The General',
    'The Wizard of Oz',
    'Touch of Evil',
    'Ran',
    'Yôjinbô',
    'District 9',
    'The Sixth Sense',
    'Snatch.',
    'Donnie Darko',
    'Annie Hall',
    'Witness for the Prosecution',
    'Smultronstället',
    'The Deer Hunter',
    'Avatar',
    'The Social Network',
    'Cool Hand Luke',
    'Strangers on a Train',
    'High Noon',
    'The Big Lebowski',
    'Hotaru no haka',
    'Kill Bill: Vol. 1',
    'It Happened One Night',
    'Platoon',
    'The Lion King',
    'Into the Wild',
    'There Will Be Blood'
];

Movie.sync({force: true})
    .then(function () {
        return Promise.map(moviesToSeed, function (movieName) {
            return getMovieFromImdb(movieName)
                .then(function (movieInfo) {
                    return {
                        title: movieName,
                        photo: movieInfo.poster,
                        watched: Math.random() > .85
                    };
                });
        }, { concurrency: 10 });
    })
    .then(function (movies) {
        return Movie.bulkCreate(movies);
    })
    .catch(console.error);