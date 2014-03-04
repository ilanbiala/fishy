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
	enemyFish = new Fish();

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
	setInterval(spawnFish, 1800);
	renderCanvas();
});