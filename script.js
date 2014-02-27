var jqCanvas,
	canvas,
	ctx,
	keysPressed = {
		37: false,
		38: false,
		39: false,
		40: false
	},
	fish;
var fishSymbolArray = ['assets/images/fish1.png', 'fish2.png', 'fish3.png', 'fish4.png'];

$(document).ready(function () {
	jqCanvas = $('canvas');
	canvas = jqCanvas[0];
	ctx = canvas.getContext('2d');
	fish = new Fish();
	$(document).on('keydown', function (e) {
		if (e.which === 37 || e.which === 38 || e.which === 39 || e.which === 40) {
			fish.move(e.which);
			keysPressed[e.which] = true;
		}
	}).on('keyup', function (e) {
		if (e.which in keysPressed) {
			keysPressed[e.which] = !keysPressed[e.which];
		}
	});
	// setInterval(render, 100);
});

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
		x: Math.floor(Math.random() * 2), // 0 = left, 1 = right
		y: Math.floor(Math.random() * 101) // 0 -> 100, high == higher up the screen
	};
	this.orientation = !this.position.x; // start fish going to center of screen
}

Fish.prototype.toString = function () {
	var consoleString = '';
	consoleString += 'Mass: ' + this.mass + '\n';
	consoleString += 'Acceleration: ' + this.acceleration + '\n';
	consoleString += 'Max Speed: ' + this.maxSpeed + '\n';
	consoleString += 'Deceleration: ' + this.deceleration + '\n';
	consoleString += 'Position: (' + this.position.x + ', ' + this.position.y + ')';
	console.log(consoleString);
};

Fish.prototype.move = function (key) {

	if (this.drawn) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	} else {
		this.drawn = !this.drawn;
		console.log('speed: ' + this.maxSpeed + ', acceleration: ' + this.acceleration + ', deceleration: ' + this.deceleration);
	}
	if (key === 37) { // left key
		this.xSpeed = Math.max(-this.maxSpeed, this.xSpeed - this.acceleration); // Increase speed unless at max
		this.orientation = 0;
	} else if (key === 38) { // up key
		this.ySpeed = Math.max(-this.maxSpeed, this.ySpeed - this.acceleration); // Increase speed unless at max
	} else if (key === 39) { // right key
		this.xSpeed = Math.min(this.maxSpeed, this.xSpeed + this.acceleration); // Increase speed unless at max
		this.orientation = 1;
	} else if (key === 40) { // down key
		this.ySpeed = Math.min(this.maxSpeed, this.ySpeed + this.acceleration); // Increase speed unless at max
	}
	console.log('xSpeed: ' + this.xSpeed);
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
	console.log('xSpeed: ' + this.xSpeed);
	this.position.x += Math.round(this.xSpeed); //Set new xCoord
	this.position.y += Math.round(this.ySpeed); //Set new yCoord
	console.log(this.position.x + ', ' + this.position.y);
	ctx.drawImage(this.symbol, this.position.x, this.position.y);
};