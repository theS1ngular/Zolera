'use strict'
const express = require('express');
const session = require('express-session');
const User = require( '../models/user');
const middleware = require('../middleware/user');
const {check, validationResult} = require('express-validator');
const router = express.Router();

router.get('/', middleware.verifyToken,(req, res, next) => {
  let title = 'Titan';
  return res.render('index', {title: title});
});

router.get('/signup', (req, res, next) => {
    let title = 'Sign Up';
    return res.render('signup', {title: title});
});

router.get('/login', (req, res, next) => {
  let title = 'Login';
  return res.render('login', {title: title});
});

router.get('/logout', (req, res, next) => {
if (req.session) {
	req.session.destroy(function(err) {
		if (err) {
			return next(err);
		} else {
		  return res.redirect('/');;
		}
	});
}
});

router.post('/signup', [
  check('email').not().isEmpty().withMessage('fields cant be empty').isEmail().withMessage('email is invalid'),
  check('pass').not().isEmpty().withMessage('fields cant be empty').isLength({min: 6}).withMessage('password should be longer than 6').escape()
  ], (req, res, next) => {
  User.findOne({ email: req.body.email }, function (error, user) {
      if (error) {
        return next(error);
      }
      if (user) {
        var err = new Error('A user with that email has already registered. Please use a different email.');
        err.status = 401;
        return next(err);
      }
    });
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors= errors.array();
      let err = new Error(errors[0].msg);
      err.status = 422;
      next(err);
      } else {
      let userData = {
        email: req.body.email,
        password: req.body.pass
    };
    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      }else {
        req.session.userId = user._id;
        return res.redirect('/');
      }
    });
      }
});

router.post('/login', (req, res, next) => {
	  if (req.body.email && req.body.pass) {
	 	  User.authenticate(req.body.email, req.body.pass, function (error, user) {
	 		  if (error || !user) {
	 			  let err = new Error('Wrong email or password');
	 			  err.status = 401;
	 			  return next(err);
	 		  }else {
	 			  req.session.userId = user._id;
	 			 return res.redirect('/');
	 		  }
	 	  });
    }else {
      let err = new Error('All Fields Required');
  	  res.status = 401;
  	  return next(err);
    }
});

module.exports = router;
