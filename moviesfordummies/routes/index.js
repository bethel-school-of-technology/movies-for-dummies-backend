var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Aquatic1',
  database: 'movieuser'
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

router.post('/user', function(req, res, next) {
  console.log(req.body);
  const newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name
  };

  router.get('/user', function(req, res) {
    models.user
      .findAll({
        where: {
          [Op.and]: {
            user_id: {
              [Op.gt]: 55
            },
            last_name: {
              [Op.like]: 'G%'
            }
          }
        }
      })
      .then(data => {
        res.render('user', {
          user: data
        });
      });
  });

  router.get('/specificUser', function(req, res, next) {
    models.user
      .findOne({
        where: {
          user_id: 2
        }
      })
      .then(user => {
        res.render('specificUser', {
          user: user
        });
      });
  });

  router.get('/user/:id', function(req, res, next) {
    let userId = parseInt(req.params.id);
    models.user
      .findOne({
        where: {
          user_id: userId
        }
      })
      .then(user => {
        res.render('specificUser', {
          user: user
        });
      });
  });

  router.get('/user', function(req, res, next) {
    models.user.findAll({}).then(foundUsers => {
      const mappedUsers = foundUsers.map(actor => ({
        UserID: user.user_id,
        Name: `${user.first_name} ${user.last_name}`
      }));
      res.send(JSON.stringify(mappedUsers));
    });
  });

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
    movie_name: req.body.movie_name,
    description: req.body.description
  };



  const selectMovie = `SELECT *
    FROM movie
    WHERE movie_name = '${newMovie.movie_name}'
    AND description = '${newMovie.description}'`;

  connection.query(selectMovie, function(err, result) {
    if (result.length > 0) {
      res.send('Sorry, that movie already exists');
    } else {
      let newMovieQuery = `INSERT INTO movie(movie_name, description) 
        VALUES('${newMovie.movie_name}', '${newMovie.description}')`;

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




