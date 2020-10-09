var express = require("express");
var router = express.Router();
var models = require("../models");
var authService = require("../services/auth");


//Movie Route - Post
router.post("/movies", (req, res) => {
    models.movies
      .findOrCreate({
        where: {
          moviesTitle: req.body.moviesTitle,
          moviesBody: req.body.moviesBody,
        },
      })
      .spread(function (result, created) {
        if (created) {
          res.redirect("/movies");
        } else {
          res.send("This movie already exists!");
        }
      });
  });

  router.get('/movies/:id', function(req, res, next) {
    let moviesId = parseInt(req.params.id)
    models.movies
      .findOne({
        where: {
          moviesId: moviesId
        }
      })
      .then(movie => {
        res.render('movie', {
          movie: movie
        });
      });
  });
  
  module.exports = router;