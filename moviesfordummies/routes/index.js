var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

router.post('/user', (req, res) => {
  models.user
    .findOrCreate({
      where: {
        first_name: req.body.first_name,
        last_name: req.body.last_name
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect('/user');
      } else {
        res.send('This actor already exists!');
      }
    });
});



router.post('/movie', (req, res) => {
  models.movie
    .findOrCreate({
      where: {
        movie_name: req.body.movie_name,
        description: req.body.description
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect('/movie');
      } else {
        res.send('This movie already exists!');
      }
    });
});

module.exports = router;




