var nodes = 0; // number of nodes
var lastX = 0; // current x co-ordinates
var lastY = 60; // current y co-ordinates
var deleted = false; // flag that helps not drawing again the 'next pointer' 

function initCanvas() {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	nodes = 0; // number of nodes active on the canvas
    lastX = 0; // position on the x axis

	<!--Draw head reference-->
	context.strokeStyle = "black";
	context.lineWidth = 1;
	context.strokeRect(20, 10, 40, 20);
	context.fillText("head", 28, 23);

	<!--Draw head vertical arrow-->
	drawHeadVerticalLine(context);
	drawArrowhead(context, 40, 60, true);
};

function drawNode(context, x, y, value) {

	<!--Draw node-->
	context.strokeStyle = "black";
	context.lineWidth = 1;
	context.strokeRect(x, y, 120, 75);

	<!--Draw value box-->
	context.strokeStyle = "black";
	context.lineWidth = 1;
	context.strokeRect(x + 80, y + 10, 33, 20);
	context.fillText(value, x + 92, y + 23);

	<!--Draw next node box-->
	context.strokeStyle = "black";
	context.lineWidth = 1;
	context.strokeRect(x + 80, y + 40, 33, 20);
};

function deleteNode(context, x, y) {
	
	nodes--;
	deleted = true; 

	<!--Delete node-->
	context.clearRect(x - 1, y - 1, 200, 81);
	
	if(nodes >= 0 && nodes < 6) {
		lastX -= 200;
	}
	else if(nodes == 6) {
		lastY = 60;
	}
	else if(nodes > 6) {
		lastX += 200;
	}
};

function insertAtBack() {

	nodes++;
	
	if(nodes > 12) {
		alert("There is also a delete operation!");
	}

    //var value = document.getElementById('insfid').value;
    var value = Math.floor((Math.random() * 100) + 1); // Value of the node, random integer [1-100]
    var canvas = document.getElementById("canvas"); // get canvas
	var context = canvas.getContext("2d"); // get context

	if(nodes == 1) { // draw the first node at (20, 60)
		lastX = 20;
		drawNode(context, lastX, 60, value);
		context.fillText("value:", 65, 82); // add value label
		context.fillText("next:", 65, 113); // add next label
	}
	else if(nodes > 1 && nodes < 7) {
		lastX += 200;
		if(!deleted) drawLine(context, lastX - 100, 110, lastX, 110); // draw a line of length 100
		drawNode(context, lastX, 60, value);
	}
	else if(nodes == 7) { // draw the 7th node on the 2nd row
		drawNode(context, lastX, 170, value);
		context.moveTo(1150, 110);
 		context.lineTo(1150, 170);
		context.strokeStyle="#black";
		drawVerticalLine(context, 200 , 50);
		drawArrowhead(context, 1118, 170, true);
		lastY = 170;
	}
	else if(nodes > 7 && nodes < 13) {
		lastX -= 200;
		if(!deleted) drawLine(context, lastX + 120, 220, lastX + 300, 220); // draw a line of length 180
		drawNode(context, lastX, 170, value);
	}

	deleted = false;

	/*
	*
	*   TODO - OOP APPROACH
	*/

	// Create Node Object
	//var node = new Node(value, );
};

function insertAtFront() {

	nodes++;

	if(nodes > 12) {
		alert("There is also a delete operation!");
	}

    //var value = document.getElementById('insfid').value;
    var value = Math.floor((Math.random() * 100) + 1); // Value of the node, random integer [1-100]
    var canvas = document.getElementById("canvas"); // get canvas
	var context = canvas.getContext("2d"); // get context

	if(nodes == 1) { // draw the first node at (20, 60)
		lastX = 20;
		drawNode(context, lastX, 60, value);
		context.fillText("value:", 65, 82); // add value label
		context.fillText("next:", 65, 113); // add next label
	}
	else if(nodes > 1 && nodes < 7) {
		lastX += 200;
		drawLine(context, lastX - 100, 110, lastX, 110); // draw an arrow of length 100
		drawNode(context, lastX, 60, value);
	}
	else if(nodes == 7) { // draw the 7th node on the 2nd row
		drawNode(context, lastX, 170, value);
		context.moveTo(1150, 110);
 		context.lineTo(1150, 170);
		context.strokeStyle="#black";
		drawVerticalLine(context, 200 , 50);
		drawArrowhead(context, 1118, 170, true);
	}
	else if(nodes > 7 && nodes < 13) {
		lastX -= 200;
		drawLine(context, lastX + 120, 220, lastX + 300, 220); // draw an arrow of length 180
		drawNode(context, lastX, 170, value);
	}
};

function clearAll() {
    
    var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    
	initCanvas();    
};

function deleteFromFront() {
    
    var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

    if(nodes > 0) deleteNode(context, 50, 60);
};

function deleteFromBack() {
    
    var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

    if(nodes > 0) deleteNode(context, lastX, lastY);
};

// from (x, y) to (z, w)
function drawLine(context, x, y, z, w) {
	context.beginPath();
	context.moveTo(x, y); // from
 	context.lineTo(z, w); // to
	context.strokeStyle = "#black";
	context.stroke();
    drawArrowhead(context, x + 100, y);
};

function drawArrowhead(ctx, x, y, vertical) {
    ctx.save();
    
    if(vertical) {
    	ctx.translate(x, y);
    	ctx.rotate(90 * Math.PI / 2);
    }
    else if (y == 220){
    	ctx.translate(x - 100, y);
    	ctx.rotate(-Math.PI / 2);
    }
    else {
    	ctx.translate(x, y);
    	ctx.rotate(Math.PI / 2);
    }
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(3, 16);  <!--Change arrow head size-->
    ctx.lineTo(-3, 16); <!--Change arrow head size-->
    ctx.closePath();
    ctx.restore();
    ctx.fill();
};

function drawHeadVerticalLine(context) {
	context.beginPath();
	context.moveTo(40, 30);
 	context.lineTo(40, 60);
	context.strokeStyle="#black";
	context.stroke();
}

function drawVerticalLine(context, x, y) {
	context.beginPath();
	context.moveTo(1118, 110);
 	context.lineTo(1118, 170);
	context.strokeStyle="#black";
	context.stroke();
}
