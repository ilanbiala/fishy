var fishSymbolArray = ['/images/fish1.png', '/images/fish2.png', '/images/fish3.png', '/images/fish4.png'];

function Fish() {
	this.mass = Math.floor(Math.random() * 3 + 3); // 3 -> 6
	this.acceleration = Math.floor(10 - Math.random() * this.mass); // 4 -> 9
	this.maxSpeed = 15 - this.mass - this.acceleration; // 3 -> 5
	this.deceleration = this.maxSpeed / (11 - this.acceleration); // RANGE GOES HERE
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.symbol = new Image(); // set up the image
	this.symbol.src = fishSymbolArray[Math.floor(Math.random() * 4)]; // which icon to use
	this.drawn = false;
	this.position = {
		// x: Math.floor(Math.random() * 2) * canvas.width, // 0 = left, 1 = right
		// y: Math.floor(Math.random() * canvas.height) // 0 -> 100, high == higher up the screen
		x: Math.floor(Math.random() * 2), // 0 = left, 1 = right
		y: Math.floor(Math.random() * 101) // 0 -> 100, high == higher up the screen
	};
	this.orientation = !this.position.x; // start fish going to center of screen
	this.moveLeft = false;
	this.moveRight = false;
	this.moveUp = false;
	this.moveDown = false;
};

Fish.prototype.toString = function () {
	var propString = '';
	propString += 'Mass: ' + this.mass + '\n';
	propString += 'Acceleration: ' + this.acceleration + '\n';
	propString += 'Max Speed: ' + this.maxSpeed + '\n';
	propString += 'Deceleration: ' + this.deceleration + '\n';
	propString += 'Position: (' + this.position.x + ', ' + this.position.y + ')';
	console.log(propString);
	return propString;
};

Fish.prototype.move = function () {
	if (this.drawn) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	} else {
		this.drawn = !this.drawn;
		console.log('speed: ' + this.maxSpeed + ', acceleration: ' + this.acceleration + ', deceleration: ' + this.deceleration);
	}

	if (this.moveLeft) { // left key
		this.xSpeed = Math.max(-this.maxSpeed - this.deceleration, this.xSpeed - this.acceleration - this.deceleration); // Increase speed unless at max
		this.orientation = 0;
	}
	if (this.moveUp) { // up key
		this.ySpeed = Math.max(-this.maxSpeed - this.deceleration, this.ySpeed - this.acceleration - this.deceleration); // Increase speed unless at max
	}
	if (this.moveRight) { // right key
		this.xSpeed = Math.min(this.maxSpeed + this.deceleration, this.xSpeed + this.acceleration + this.deceleration); // Increase speed unless at max
		this.orientation = 1;
		// if (this.orientation == 1) {
		// this.symbol.style.webkitTransform = 'rotateY(180deg)';
		// }
	}
	if (this.moveDown) { // down key
		this.ySpeed = Math.min(this.maxSpeed + this.deceleration, this.ySpeed + this.acceleration + this.deceleration); // Increase speed unless at max
	}
	//Decelerate horizontal
	if (this.xSpeed <= 0) {
		this.xSpeed = Math.min(0, this.xSpeed + this.deceleration); // If speed is negative, add deceleration value until 0
	} else {
		this.xSpeed = Math.max(0, this.xSpeed - this.deceleration); // If speed is positive, subtract deceleration value until 0
	}
	//Decelerate vertical
	if (this.ySpeed <= 0) {
		this.ySpeed = Math.min(0, this.ySpeed + this.deceleration); // If speed is negative, add deceleration value until 0
	} else {
		this.ySpeed = Math.max(0, this.ySpeed - this.deceleration); // If speed is positive, subtract deceleration value until 0	
	}

	this.position.x += Math.round(this.xSpeed); //Set new xCoord
	this.position.y += Math.round(this.ySpeed); //Set new yCoord
	// if (this.position.x <= 0) {
	// 	this.position.x = 0;
	// } else if (this.position.x >= 0) {
	// 	this.position.x = 0;
	// }
	if (this.position.y <= 0) {
		this.position.y = 0;
	} else if (this.position.y + 175 >= canvas.height) {
		this.position.y = canvas.height - 175;
	}
};

function checkMove() {
	fish.moveLeft = keysPressed[37];
	fish.moveUp = keysPressed[38];
	fish.moveRight = keysPressed[39];
	fish.moveDown = keysPressed[40];
	enemyFish.moveLeft = enemyFish.moveUp = enemyFish.moveRight = enemyFish.moveDown = false;
	if (fish.position.x > enemyFish.position.x) {
		enemyFish.moveRight = true;
	} else if (fish.position.x < enemyFish.position.x) {
		enemyFish.moveLeft = true;
	}
	if (fish.position.y > enemyFish.position.y) {
		enemyFish.moveDown = true;
	} else if (fish.position.y < enemyFish.position.x) {
		enemyFish.moveUp = true;
	}
}