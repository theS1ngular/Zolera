'use strict'
const User = require( '../models/user'); 

function loggedOut(req, res, next) {
	if (req.session && req.session.userId) {
		return res.redirect('/');
	}
    return next();
}

function requiresLogin(req, res, next) {
	if (req.session && req.session.userId) {
		return next();
	}else {
		let err = new Error('You must be logged in');
		err.status = 401;
		return next(err);
	}
}

function signupValidation(req, res, next) {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)){
    let err = new Error('invalid email');
    err.status = 401;
    return next(err);
  }else if (req.body.pass.length <= 6) {
    let err = new Error('password needs to be longer than 6');
    err.status = 401;
    return next(err);
  }else if (req.body.email && req.body.pass) {
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
  }else {
    let err = new Error('All Fields Required');
    res.status = 401;
    return next(err);
 } 
}

module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;
module.exports.signupValidation = signupValidation;