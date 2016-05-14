var express    = require('express');
var UAParser     = require('ua-parser-js');
var app        = express();

var port = process.env.PORT || 8080;

var parser = new UAParser;

app.get('/', function(req, res) {
	var headers = req.headers;
	var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
	var agent = req.header('user-agent');
	var language = req.header('accept-language').split(',')[0];
	var os = parser.setUA(agent).getOS();

	var response = {
		"ip_address": ip,
		"language": language,
		"operating_system": os
	};

	console.log(response);
	res.send(response);
});

app.listen(port, function() {
	console.log("listening at port " + port);
});