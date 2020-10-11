var express = require("express");
var router = express.Router();
var models = require("../models");
var authService = require("../services/auth");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get('/specificUser', function(req, res, next) {
  models.users
    .findOne({
      where: {
        userId: 3
      }
    })
    .then(user => {
      res.render('specificUser', {
        user: user
      });
    });
});

router.get('/users/:id', function(req, res, next) {
  let userId = parseInt(req.params.id);
  models.users
    .findOne({
      where: {
        userId: userId
      }
    })
    .then(user => {
      res.render('specificUser', {
        user: user
      });
    });
});


//SignUp route - get
router.get("/register", function (req, res, next) {
  res.render("register");
});

//SignUp route - Post
router.post("/register", function (req, res, next) {
  models.users
    .findOrCreate({
      where: {
        username: req.body.username,
      },
      defaults: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: authService.hashPassword(req.body.password),
      },
    })
    .spread(function (result, created) {
      if (created) {
        res.json({
          message: "User Created Successfully",
          status: 200,
          created,
        });
      } else {
        res.json({
          message: "Creating a user was unsuccessful",
          status: 400,
        });
      }
    });
});

//Login route - Post
router.post("/login", function (req, res, next) {
  let username=req.body.username
  let password=req.body.password
  console.log(username, password);
  models.users
    .findOne({
      where: {
        username: req.body.username,
      },
      
    })
     .then((user) => {
      if (!user) {
        console.log("User not found");
        
        return res.json({
          message: "Login Failed!!!",
          status: 401,
        });
      }
      if (user) {
        let passwordMatch = authService.comparePasswords(
          req.body.password,
          user.password
        );
        if (passwordMatch) {
          let token = authService.signUser(user); // <--- Uses the authService to create jwt token
          res.json({
            message: "User logged in Successfully",
            status: 200,
            jwt: token,
          });
        } else {
          console.log("Wrong password");
          res.json({
            message: "Password Failed!!!!",
            status: 400,
          });
        }
      } else {
        console.log("Wrong password");
        res.json({
          message: "Password Failed!!!!",
          status: 400,
        });
      }
    });
});

//Profile Route - Get
router.get("/profile", function (req, res, next) {
  let token = req.headers["authorization"];
  authService.verifyUser(token).then((user) => {
    if (user) {
      res.json({
        message: "Success!!!!",
        status: 200,
        userinfo: user,
      });
    } else {
      res.json({
        message: "Password Fail!!!!",
        status: 400,
      });
    }
  });
});


module.exports = router;
