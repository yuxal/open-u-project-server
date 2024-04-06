var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const router = require('./router');


var app = express();

app.set('x-powered-by', false);

app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(router);

module.exports = app;
