// Canvas-specific code

// function clearCanvas(context, canvas) {
// 	context.clearRect(0, 0, canvas.width, canvas.height);
// }

function renderCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	fish.move();
	enemyFish.hunt();
	ctx.drawImage(fish.symbol, fish.position.x, fish.position.y);
	ctx.drawImage(enemyFish.symbol, enemyFish.position.x, enemyFish.position.y);
	for (var i = 0; i < enemies.length; i++) {
		var currentFish = new Fish();
		currentFish.mass = enemies[i].mass;
		currentFish.acceleration = enemies[i].acceleration;
		currentFish.deceleration = enemies[i].deceleration;
		currentFish.drawn = enemies[i].drawn;
		currentFish.icon = enemies[i].icon || enemies[i].image;
		currentFish.maxSpeed = enemies[i].maxSpeed;
		currentFish.moveDown = enemies[i].moveDown;
		currentFish.moveLeft = enemies[i].moveLeft;
		currentFish.moveRight = enemies[i].moveRight;
		currentFish.moveUp = enemies[i].moveUp;
		currentFish.orientation = enemies[i].orientation;
		currentFish.position = enemies[i].position;
		currentFish.xSpeed = enemies[i].xSpeed;
		currentFish.ySpeed = enemies[i].ySpeed;
		currentFish.swim();
		var image = new Image();
		image.onload = function () {
			ctx.drawImage(image, currentFish.position.x, currentFish.position.y);
		};
		image.src = currentFish.icon;
	}
	requestAnimationFrame(renderCanvas);
}
