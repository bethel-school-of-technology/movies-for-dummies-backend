var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  models.user
    .findOrCreate({
      where: {
        Username: req.body.Username
      },
      defaults: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        Email: req.body.Email,
        Password: req.body.Password
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.send('User successfully created');
      } else {
        res.send('This user already exists');
      }
    });
});


module.exports = router;
