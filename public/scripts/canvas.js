// Canvas-specific code

// function clearCanvas(context, canvas) {
// 	context.clearRect(0, 0, canvas.width, canvas.height);
// }

function renderCanvas() {
	checkMove();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	fish.move();
	enemyFish.move();
	ctx.drawImage(fish.symbol, fish.position.x, fish.position.y);
	ctx.drawImage(enemyFish.symbol, enemyFish.position.x, enemyFish.position.y);
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].swim();
		ctx.drawImage(enemies[i].symbol, enemies[i].position.x, enemies[i].position.y);
	}
	cleanFish();
	requestAnimationFrame(renderCanvas);
}