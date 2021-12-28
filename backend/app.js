'use strict'
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo') (session);
const routes = require('./routes/user');
const {HashedModuleIdsPlugin} = require('webpack');
const app = express();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

mongoose.connect(process.env.DB_CONNECT ,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
.once('open', () => {
	console.log('DB connection open');
});

app.use(session({
	secret: 'wutang',
	resave: true,
	saveUninitialized: false,
	store: new mongoStore({
		mongooseConnection: db
	})
}));

app.use(function (req, res, next) {
	res.locals.currrentUser = req.session.userId;
	next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', routes);

app.use(function(req, res, next) {
   let err = new Error('File Not Found');
   err.status = 404
   next(err);
});

app.listen(80, function() {
	console.log('app listening on port 80');
});

module.exports = app;
