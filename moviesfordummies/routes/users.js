var express = require("express");
var router = express.Router();
var models = require("../models");
var authService = require("../services/auth");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//SignUp route - get
router.get("/register", function (req, res, next) {
  res.render("register");
});

//SignUp route - Post
// 
// router.post('/register', function(req, res) {
//   if (!req.body.username || !req.body.password) {
//     res.json({success: false, msg: 'Please pass username and password.'});
//   } else {
//     var newUser = new User({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       username: req.body.username,
//       password: req.body.password
//     });
//     // save the user
//     newUser.save(function(err) {
//       if (err) {
//         return res.json({success: false, msg: 'Username already exists.'});
//       }
//       res.json({success: true, msg: 'Successful created new user.'});
//     });
//   }
// });
router.post('/register', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password 
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

// Login route - Post

// router.post('/login', function (req, res, next) {
//   models.users.findOne({
//     where: {
//       username: req.body.username,
//       password: req.body.password
//     }
//   }).then(user => {
//     if (!user) {
//       console.log('User not found')
//       return res.status(401).json({
//         message: "Login Failed"
//       });
//     }
//     if (user) {
//       let token = authService.signUser(user); // <--- Uses the authService to create jwt token
//       res.cookie('jwt', token); // <--- Adds token to response as a cookie
//       res.send('Login successful');
//     } else {
//       console.log('Wrong password');
//       res.redirect('login')
//     }
//   });
// });
// 
router.post("/login", function (req, res, next) {
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
 


// //Profile Route - Get
// router.get("/profile", function (req, res, next) {
//   let token = req.headers["authorization"];
//   authService.verifyUser(token).then((user) => {
//     if (user) {
//       res.json({
//         message: "Success!!!!",
//         status: 200,
//         userinfo: user,
//       });
//     } else {
//       res.json({
//         message: "Password Fail!!!!",
//         status: 400,
//       });
//     }
//   });
// });
// router.post('/login', function (req, res, next) {
//   models.users.findOne({
//     where: {
//       Username: req.body.username
//     }
//   }).then(user => {
//     if (!user) {
//       console.log('User not found')
//       return res.status(401).json({
//         message: "Login Failed"
//       });
//     } else {
//       let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
//       if (passwordMatch) {
//         let token = authService.signUser(user);
//         res.cookie('jwt', token);
//         res.send('Login successful');
//       } else {
//         console.log('Wrong password');
//         res.send('Wrong password');
//       }
//     }
//   });
// });


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

module.exports = router;
