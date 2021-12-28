'use strict'
const user = require( '../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

function verifyToken (req, res, next) {
  const token = req.header('auth-token');
  if(!token) return res.status(401).send('Access Denied');

  try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch(error) {
    res.status(401).json({message: 'Auth failed'});
  }
};

module.exports.verifyToken = verifyToken;
