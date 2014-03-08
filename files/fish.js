var fishSymbolArray = ['/images/fish1.png', '/images/fish2.png', '/images/fish3.png', '/images/fish4.png'];
var enemies = [];
var cleaningFish = false;
var maxDumbFish = 20; //Maximum number of computer-controlled, non-chasing fish
var numberOfFish = 0;
var canvas = {
	width: 1920,
	height: 1080
};

function Fish() {
	this.mass = Math.floor(Math.random() * 3 + 3); // 3 -> 6
	this.acceleration = Math.floor(10 - Math.random() * this.mass); // 4 -> 9
	this.maxSpeed = 15 - this.mass - this.acceleration; // 3 -> 5
	this.deceleration = this.maxSpeed / (11 - this.acceleration); // RANGE GOES HERE
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.icon = fishSymbolArray[Math.floor(Math.random() * 4)]; // fish graphic
	this.drawn = false;
	this.position = {
		// x: Math.floor(Math.random() * 2) * canvas.width, // 0 = left, 1 = right
		// y: Math.floor(Math.random() * canvas.height) // 0 -> 100, high == higher up the screen
		x: Math.floor(Math.random() * 275 + 25), // 25 -> 300,
		y: Math.floor(Math.random() * 475 + 25) // 25 -> 500, high == lower down the screen
	};
	this.orientation = Math.floor(Math.random()); // start fish going to center of screen
}

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
	if (!this.drawn) {
		this.drawn = !this.drawn;
		console.log('speed: ' + this.maxSpeed + ', acceleration: ' + this.acceleration + ', deceleration: ' + this.deceleration);
	}

	if (keysPressed[37]) { // left key
		this.xSpeed = Math.max(-this.maxSpeed - this.deceleration, this.xSpeed - this.acceleration - this.deceleration); // Increase speed unless at max
		this.orientation = 0;
	}
	if (keysPressed[38]) { // up key
		this.ySpeed = Math.max(-this.maxSpeed - this.deceleration, this.ySpeed - this.acceleration - this.deceleration); // Increase speed unless at max
	}
	if (keysPressed[39]) { // right key
		this.xSpeed = Math.min(this.maxSpeed + this.deceleration, this.xSpeed + this.acceleration + this.deceleration); // Increase speed unless at max
		this.orientation = 1;
		// if (this.orientation == 1) {
		// this.symbol.style.webkitTransform = 'rotateY(180deg)';
		// }
	}
	if (keysPressed[40]) { // down key
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
	if (this.position.x < 0) {
		this.position.x = canvas.width;
	} else if (this.position.x >= canvas.width + 50) {
		this.position.x = 0;
	}
	if (this.position.y <= 0) {
		this.position.y = 0;
	} else if (this.position.y + 175 >= canvas.height) {
		this.position.y = canvas.height - 175;
	}
};

Fish.prototype.swim = function () {
	this.position.x += Math.random() * 8 + 1; // 1 -> 15
};

function spawnFish() {
	if (Math.floor(Math.random() * 10) === 0 && numberOfFish < maxDumbFish) { // 1 in 10 chance
		enemies.push(new Fish());
		numberOfFish++;
	}
	return enemies;
}

function cleanFish() {
	for (var i = 0; i < enemies.length; i++) {
		if (enemies[i].position.x > (canvas.width + 250)) {
			enemies.splice(i, 1);
			numberOfFish--;
		}
	}
}

Fish.prototype.hunt = function () {
	//"Smarter" movement for the enemy fish; rather than moving at 45 or 90 degree angles, it finds a vector that'll make a straight path towards the fish
	//Todo: declutter, re-check math equations & logic
	var dX = fish.position.x - this.position.x; //difference in X between enemy and fish
	var dY = fish.position.y - this.position.y; //difference in Y between enemy and fish
	var dLin = Math.sqrt(Math.pow(dY, 2) + Math.pow(dX, 2));
	if (dX === 0 && dY === 0) {
		this.xSpeed = 0;
		this.ySpeed = 0;
	} else {
		if (dX > 0 && this.xSpeed > 0 && dX <= Math.pow(this.xSpeed, 2) / (2 * (this.deceleration + this.acceleration))) //If the enemyFish is within range to constantly decelerate (both by opposing its current motion and natural deceleration), decelerate until enemyFish gets to 0
		{
			this.xSpeed = Math.max(0, this.xSpeed - this.acceleration - this.deceleration);
		} else if (dX < 0 && this.xSpeed < 0 && Math.abs(dX) <= Math.pow(this.xSpeed, 2) / (2 * (this.deceleration + this.acceleration))) //Same condition as above, but from the other side
		{
			this.xSpeed = Math.min(0, this.xSpeed + this.acceleration + this.deceleration);
		} else {
			if (dY === 0) { // If y is zero, move purely horizontally
				if (dX > 0) this.xSpeed = Math.min(this.maxSpeed + this.deceleration, this.xSpeed + this.acceleration + this.deceleration);
				if (dX < 0) this.xSpeed = Math.max(-this.maxSpeed - this.deceleration, this.xSpeed - this.acceleration - this.deceleration);
			} else {
				if (dX > 0) { // If accelerating in the x positive direction
					this.xSpeed = Math.min( //Calculate vector's x component, see if max speed or xSpeed + accel is greater in magnitude
						(dX / dLin) * (this.maxSpeed + this.deceleration), //Alter max speed so that xSpeed is the x component of a vector of magnitute maxSpeed at the angle the fish travels along
						this.xSpeed + (dX / dLin) * (this.acceleration + this.deceleration)); //Accelerate x speed by adding the x-component of the target vector
				}
				if (dX < 0) { // If accelerating in the x negative direction
					this.xSpeed = Math.max( //Calculate vector's x component, see if max speed or xSpeed + accel is greater in magnitude
						(dX / dLin) * (this.maxSpeed + this.deceleration), //Alter max speed so that xSpeed is the x component of a vector of magnitute maxSpeed at the angle the fish travels along
						this.xSpeed + (dX / dLin) * (this.acceleration + this.deceleration)); //Accelerate x speed by adding the x-component of the target vector
				}
			}
			//Decelerate horizontal
			if (this.xSpeed <= 0) {
				this.xSpeed = Math.min(0, this.xSpeed - (dX / dLin) * this.deceleration); // If speed is negative, add deceleration value until 0
			} else {
				this.xSpeed = Math.max(0, this.xSpeed - (dX / dLin) * this.deceleration); // If speed is positive, subtract deceleration value until 0
			}
		}
		if (dY > 0 && this.ySpeed > 0 && dY <= Math.pow(this.ySpeed, 2) / (2 * (this.deceleration + this.acceleration))) {
			this.ySpeed = Math.max(0, this.ySpeed - this.acceleration - this.deceleration);
		} else if (dY < 0 && this.ySpeed < 0 && Math.abs(dY) <= Math.pow(this.ySpeed, 2) / (2 * (this.deceleration + this.acceleration))) {
			this.ySpeed = Math.min(0, this.ySpeed + this.acceleration + this.deceleration);
		} else {
			if (dX === 0) { // If dx is zero, move purely vertically
				if (dY > 0) this.ySpeed = Math.min(this.maxSpeed, this.ySpeed + this.acceleration + this.deceleration);
				if (dY < 0) this.ySpeed = Math.max(-this.maxSpeed, this.ySpeed - this.acceleration - this.deceleration);
			} else {
				if (dY > 0) { // If accelerating in the y positive direction
					this.ySpeed = Math.min( //Calculate vector's Y component, see if max speed or ySpeed + accel is greater in magnitude
						(dY / dLin) * (this.maxSpeed + this.deceleration), //Alter max speed so that ySpeed is the y component of a vector of magnitute maxSpeed at the angle the fish travels along
						this.ySpeed + (dY / dLin) * (this.acceleration + this.deceleration)); //Accelerate Y speed by adding the y-component of the target vector
				} else if (dY < 0) { // If accelerating in the y negative direction
					this.ySpeed = Math.max( //Calculate vector's Y component, see if max speed or ySpeed + accel is greater in magnitude
						(dY / dLin) * (this.maxSpeed + this.deceleration), //Alter max speed so that ySpeed is the y component of a vector of magnitute maxSpeed at the angle the fish travels along
						this.ySpeed + (dY / dLin) * (this.acceleration + this.deceleration)); //Accelerate Y speed by adding the y-component of the target vector
				}
			}
			//Decelerate vertical
			if (this.ySpeed <= 0) {
				this.ySpeed = Math.min(0, this.ySpeed - (dY / dLin) * this.deceleration); // If speed is negative, add deceleration value until 0
			} else {
				this.ySpeed = Math.max(0, this.ySpeed - (dY / dLin) * this.deceleration); // If speed is positive, subtract deceleration value until 0
			}
		}
	}
	this.position.x += Math.round(this.xSpeed); //Set new xCoord
	this.position.y += Math.round(this.ySpeed); //Set new yCoord

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

module.exports = Fish;
module.exports.swim = Fish.prototype.swim;
module.exports.spawnFish = spawnFish;
module.exports.cleanFish = cleanFish;
// exports.enemies = enemies;
