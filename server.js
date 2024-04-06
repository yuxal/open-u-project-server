require('dotenv').config();

var app = require('./app');

var port = 5000;
var startTime = new Date();

app.listen(port, function() {
	console.log("Server start at %s. Listening on %d", startTime, port);
});
