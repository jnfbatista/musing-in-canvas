var start = null;

var x = 0, y = 0;

var circles = new Array();

function Circle(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;

	this.direction = Math.random() * 2 * Math.PI;
	this.initSpeed = Math.random() * 10;
	//this.a = a;

	this.nextPosition = function () {
		this.x = this.x + 1 * Math.cos(this.direction);
		this.y = this.y + 1 * Math.sin(this.direction);
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

function draw(timestamp) {
	currentScreenWidth = document.body.clientWidth;
	currentScreenHeight = document.body.clientHeight;

    context.clearRect(0,0, currentScreenWidth, currentScreenHeight);

	for (var i = circles.length - 1; i >= 0; i--) {
		drawCircle(circles[i]);
	};

	window.requestAnimationFrame(draw);
}

function drawCircle(circle) {
    nextPosition = circle.nextPosition();

	

	context.restore();
	if (
		(nextPosition[0] >= 0 &&  nextPosition[0] <= currentScreenWidth) &&
		(nextPosition[1] >= 0 &&  nextPosition[1] <= currentScreenHeight)
		) {
		context.beginPath();
		context.arc(nextPosition[0], nextPosition[1], circle.radius, 0, 2 * Math.PI, false);
		context.fillStyle = 'green';
		context.fill();
		context.lineWidth = 5;
		context.strokeStyle = '#003300';
		context.stroke();
		
	} 
	

}