/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path');

var app = express(),
	server = http.createServer(app),
	io = require('socket.io').listen(server);

var Fish = require('./files/fish.js'),
	spawnFish = require('./files/fish.js').spawnFish,
	cleanFish = require('./files/fish.js').cleanFish;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);

server.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});

var enemies;

setInterval(function () {
	enemies = spawnFish();
	cleanFish();
	console.log(enemies.length);
}, 500);

io.set('loglevel', 10);
io.sockets.on('connection', function (socket) {
	setInterval(function () {
		socket.emit('updates', {
			enemies: [new Fish()]
		});
	}, 500);
	socket.on('update', function (data) {
		console.log(data);

	});
});
