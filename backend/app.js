'use strict'
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const {body, validation} = require('express-validator');
const mongoStore = require('connect-mongo') (session);
const routes = require('./routes/index');
const {HashedModuleIdsPlugin} = require('webpack');
const app = express();

mongoose.connect('mongodb://localhost/zolera', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
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
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use('/', routes);

app.use(function(req, res, next) {
   let err = new Error('File Not Found');
   err.status = 404
   next(err);
});

app.use(function(err, req, res, next) {
	res.status = err.status || 500;
	if (res.status === 404) {
      res.render('error', {error : err.message, status: res.status});
	}
    if (req.url == '/signup') {
      res.render('signup', {error : err.message, title: 'Sign Up'});
    }
    if (req.url == '/login') {
      res.render('login', {error : err.message, title: 'Login'});
    }
});

app.listen(80, function() {
	console.log('app listening on port 80');
});

module.exports = app;
