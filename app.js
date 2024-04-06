const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = require('./router');


const app = express();

app.set('x-powered-by', false);

app.use(cookieParser());
app.use(session({
	secret: 'somesuperdupersecretkey',
	resave: false,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.use(router);

module.exports = app;
