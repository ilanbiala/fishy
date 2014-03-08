// Canvas-specific code

// function clearCanvas(context, canvas) {
// 	context.clearRect(0, 0, canvas.width, canvas.height);
// }

var image = new Image();

function renderCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < enemies.length; i++) {
		var currentFish = new Fish();
		for (var key in enemies[i]) {
			if (enemies[i].hasOwnProperty(key)) {
				currentFish[key] = enemies[i][key];
			}
		}
		image.onload = function () {
			ctx.drawImage(image, currentFish.position.x, currentFish.position.y);
		};
		image.src = currentFish.icon;
	}
	fish.move();
	enemyFish.hunt();
	ctx.drawImage(fish.symbol, fish.position.x, fish.position.y);
	ctx.drawImage(enemyFish.symbol, enemyFish.position.x, enemyFish.position.y);

	requestAnimationFrame(renderCanvas);
}
