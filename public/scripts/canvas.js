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
	requestAnimationFrame(renderCanvas);
}