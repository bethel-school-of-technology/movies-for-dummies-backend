var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var staticModels = require('../staticModels/planets');

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Aquatic1',
  database: 'sakila'
});

connection.connect(function(err) {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Yay! You are connected to the database!');
});

const query = `SELECT * from actor LIMIT 10`;

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

module.exports = router;




