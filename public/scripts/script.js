var canvas,
	ctx,
	gl,
	keysPressed = {
		37: false,
		38: false,
		39: false,
		40: false,
		lastKey: null
	},
	fish = new Fish(),
	enemyFish = new Fish(),
	socket = io.connect();

$(document).ready(function () {
	canvas = $('canvas')[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	$(document).on('keydown', function (e) {
		if (e.which === 37 || e.which === 38 || e.which === 39 || e.which === 40) {
			keysPressed[e.which] = true;
			keysPressed.lastKey = e.which;
		}
	}).on('keyup', function (e) {
		if (e.which in keysPressed) {
			keysPressed[e.which] = !keysPressed[e.which];
			if (keysPressed.lastKey == e.which) {
				keysPressed.lastKey = null;
			}
		}
	});
	ctx = canvas.getContext('2d');
	setInterval(spawnFish, 100);
	renderCanvas();
	// setInterval(function () {
	// 	if (enemies.length > 0) {
	// 		var fishArray = enemies[0];
	// 		fishArray.icon = fishArray.symbol.src;
	// 		fishArray.symbol = 'abc';
	// 		socket.emit('update', {
	// 			enemies: fishArray,
	// 		});
	// 	} else {
	// 		socket.emit('update', {
	// 			enemies: null,
	// 		});
	// 	}
	// }, 250);
	socket.on('updates', function (data) {
		console.log(data);
	});
});
