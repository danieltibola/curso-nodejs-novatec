// app.js
'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let debug = require('debug')('curso:bin:www');
let nunjucks = require('nunjucks');

app.set('view engine', 'html');

nunjucks.configure('views', {
	autoescape: true,
	express: app
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(function(request, response, next){
	debug('passou por aqui!');
	next();
});

app.use(require('./routes'));

app.use(function(request, response, next){
	let error = new Error('Route not found');
	error.status = 404;
	next(error);
});

app.use(function(error, request, response, next){
	response.status(error.status || 500).json(error);
});

module.exports = app;