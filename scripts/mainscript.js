// Circles!!!
var circles = new Array();

// constants
var gravity = 0.49;
var elastCoeff = 0.7;
var dragCoeff = 0.06;

var context = null;	


// circle definition
function Circle(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;

	this.direction = Math.random() * (Math.PI * 0.75)  + Math.PI * 0.25 ;
	this.initSpeed = - (Math.random() * 5 + 10);

	// speed
	this.v = [this.initSpeed * Math.cos(this.direction),
			this.initSpeed * Math.sin(this.direction) + gravity];

	// calculate next position aux function
	this.nextPosition = function () {
		currentScreenHeight = document.body.clientHeight;

		// check if it hit bottom
		if (currentScreenHeight <= this.y + this.radius + this.v[1]) {

			// invert vertical speed with some loss
			this.v[1] = -this.v[1] * elastCoeff;

		}

		if (Math.abs(this.y + radius -  currentScreenHeight) >= 1) {

			// Accelerate fall
			this.v[1] = this.v[1] + gravity;
			this.y = this.y + this.v[1];	

		} else {

			// Apply bottom drag
			this.v[0] =  this.v[0] - this.v[0] * dragCoeff;
		}
		
		this.x = this.x + this.v[0];
		
		return [this.x, this.y];
	}
}

// sending projectile function
function fireInTheHole(event) {

	// get the mouse coordinates
	var x = event.pageX;
	var y = event.pageY;

	//alert( x + " " + y );
	circle = new Circle(x,y, 10);
	circles.push(circle);

}

// main draw function
function draw(timestamp) {
	currentScreenWidth = document.body.clientWidth;
	currentScreenHeight = document.body.clientHeight;

    context.clearRect(0,0, currentScreenWidth, currentScreenHeight);

	for (var i = circles.length - 1; i >= 0; i--) {
		drawCircle(circles[i]);
	};

	window.requestAnimationFrame(draw);
}
 
// draws the circle
function drawCircle(circle) {
    nextPosition = circle.nextPosition();
	
	context.beginPath();
	context.arc(nextPosition[0], nextPosition[1], circle.radius, 0, 2 * Math.PI, false);
	context.fillStyle = 'blue';
	context.fill();
	context.lineWidth = 1;
	context.strokeStyle = '#6666ff';
	context.stroke();
	

}


function adjustCanvas(){

	var canvas = document.getElementById('c');
	context = canvas.getContext('2d');

    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    for (var i = circles.length - 1; i >= 0; i--) {

    	if(circles[i].y + circles[i].radius > canvas.height) {
    		circles[i].y = canvas.height - circles[i].radius;
    	}
    }
}


