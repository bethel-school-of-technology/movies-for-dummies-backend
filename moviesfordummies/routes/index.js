var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var staticModels = require('../staticModels/planets');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password1!',
  database: 'movieUser'
});

connection.connect(function(err) {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Yay! You are connected to the database!');
});

const query = `SELECT * from user LIMIT 10`;

connection.query(query, (err, results) => {
  if (err) throw err;
  console.log(results);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/staticPlanets', function (req, res, next) {

  res.send(JSON.stringify(
    staticModels.planet
  ));
});

router.post('/user', function(req, res, next) {
  console.log(req.body);
  const newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name
  };

  const selectUser = `SELECT *
    FROM user
    WHERE first_name = '${newUser.first_name}'
    AND last_name = '${newUser.last_name}'`;

  connection.query(selectUser, function(err, result) {
    if (result.length > 0) {
      res.send('Sorry, that user already exists');
    } else {
      let newUserQuery = `INSERT INTO user(first_name, last_name) 
        VALUES('${newUser.first_name}', '${newUser.last_name}')`;

      connection.query(newUserQuery, function(err, insertResult) {
        if (err) {
          res.render('error', { message: 'Oops, something went wrong!' });
        } else {
          res.redirect('/user');
        }
      });
    }
  });
});
router.post('/movie', function(req, res, next) {
  console.log(req.body);
  const newMovie = {
    movie_name: req.body.movie_name
  };

  const selectMovie = `SELECT *
    FROM movie
    WHERE movie_name = '${newMovie.movie_name}'`;

  connection.query(selectMovie, function(err, result) {
    if (result.length > 0) {
      res.send('Sorry, that movie already exists');
    } else {
      let newMovieQuery = `INSERT INTO movie(movie_name) 
        VALUES('${newMovie.movie_name}')`;

      connection.query(newMovieQuery, function(err, insertResult) {
        if (err) {
          res.render('error', { message: 'Oops, something went wrong!' });
        } else {
          res.redirect('/movie');
        }
      });
    }
  });
});





module.exports = router;




