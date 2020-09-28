var express = require('express');
var router = express.Router();
///const mysql = require('mysql2');
//const models = require('../models');
//const Sequelize = require('sequelize');
//const Op = Sequelize.Op;


/* GET home page. */

/*router.get('/specificUser', function(req, res, next) {
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
  });*/


module.exports = router;




