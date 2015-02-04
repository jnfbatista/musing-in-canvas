var start = null;

var x = 0, y = 0;

var circles = new Array();

var gravity = 0.1;


// circle definition
function Circle(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;

	this.direction = Math.random() * Math.PI;
	this.initSpeed = - (Math.random() * 5 + 5);

	// speed
	this.v = [this.initSpeed * Math.cos(this.direction),
			this.initSpeed * Math.sin(this.direction) + gravity];

	this.nextPosition = function () {
		this.v[1] = this.v[1] + gravity;
		this.x = this.x + this.v[0];
		this.y = this.y + this.v[1];
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
	context.fillStyle = 'green';
	context.fill();
	context.lineWidth = 5;
	context.strokeStyle = '#003300';
	context.stroke();
	

}