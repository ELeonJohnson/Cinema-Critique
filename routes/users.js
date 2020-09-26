const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

//User Model
const User = require('../models/Users');
const { forwardAuthenticated } = require('../config/auth');

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

router.get("/register", forwardAuthenticated, (req, res) => res.render("register"));

router.post("/register", (req, res) => {
    const {firstName, lastName, username, email, password, password2} = req.body;

    let errors = [];

    // Check Required Fields
    if(!firstName || !lastName || !username || !email || !password || !password2) {
        errors.push( {msg: "Please Fill In All Fields"});
    }

    //Check If Passwords Match
    if(password != password2){
        errors.push({msg: "Passwords Do Not Match"});
    }

    //Check Passowrd's Length
    if(password.length < 6) {
        errors.push({msg: "Passwords Should Be Atleast 6 Characters"});
    }

    if(errors.length > 0){
        res.render("register", {
            errors,
            firstName,
            lastName,
            username,
            email,
            password,
            password2
        });
    } else {
        // Validation Pass
        User.findOne({email: email})
        .then(user => {
            if(user) {
                //User Exists
                errors.push({msg: "Email Is Already Registered"});
                res.render("register", {
                    errors,
                    firstName,
                    lastName,
                    username,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    firstName,
                    lastName,
                    username,
                    email,
                    password
                });
                //Hash Password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                      if (err) throw err;
                      newUser.password = hash;
                      newUser
                        .save()
                        .then(user => {
                          req.flash(
                            'success_msg',
                            'You are now registered and can log in'
                          );
                          res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));
                    });
                  });
                }
              });
            }
          });
          

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });
  
// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You Are Logged Out');
    res.redirect('/users/login');
  });

module.exports = router;