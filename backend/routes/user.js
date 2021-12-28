const express = require('express');
const User = require('../models/user');
const { userSchema } = require('./validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const middleware = require('../middleware/user');
const { consoleTestResultHandler } = require('tslint/lib/test');
const { hasModifier } = require('tslint');

const router = express.Router();

router.post("/api/signup", async (req, res, next)=> {
  try {
  const result =  await userSchema.validateAsync(req.body);

  const emailExist = await User.findOne({ email: result.email });
  if (emailExist) return res.status(400).send('Email already exists');
  const user =  new User({
    email: result.email,
    password: result.password
  });
  const savedUser = await user.save();
  res.send(savedUser);

  } catch(error) {
    if (error.isjoi === true) error.status = 422;
    res.status(400).send(error.message);
    // next(error);
  }
  });

router.post("/api/login", async (req, res)=> {
  const user = await User.findOne({email: req.body.email});
    if (!user) {
      return res.status(401).send('Email or Password is invalid');
    }

  const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass){
      return res.status(401).send('Email or Password is invalid');
    }

  const token = await jwt.sign({email: user.email, userId: user._id}, process.env.TOKEN_SECRET, {expiresIn: '5h'});
  res.status(200).send({token: token});
});

module.exports= router;
