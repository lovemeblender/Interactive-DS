var nodes = 0;
var lastX = 0;

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
	
	<!--Delete node-->
	context.clearRect(x, y, 140, 80);

	<!--Delete value box-->
	context.clearRect(x + 80, y + 10, 40, 20);

	<!--Delete next node box-->
	context.clearRect(x + 80, y + 40, 40, 20);
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
		drawLine(context, lastX - 100, 110, lastX, 110); // draw a line of length 100
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
		drawLine(context, lastX + 120, 220, lastX + 300, 220); // draw a line of length 180
		drawNode(context, lastX, 170, value);
	}

	/*
	*
	*   TODO - OOP APPROACH
	*/

	// Create Node Object
	//var node = new Node(value, );
};

function insertAtFront() {
    var value = Math.floor((Math.random() * 100) + 1); // Random integer [1-100]
    var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	alert("Inserted " + value);
	if(nodes == 1) {
		lastX = 50;
		drawNode(context, 50, 60, value);
		context.fillText("value:", 68, 82);
		context.fillText("next:", 68, 113);
	}
	else if(nodes > 1 && nodes < 7) {
		lastX += 200;
		drawLine(context, lastX, 110);
		drawNode(context, lastX, 60, value);
	}

};

function clearAll() {
    var value = Math.floor((Math.random() * 100) + 1);
    var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    
	initCanvas();    
};

function deleteFromFront() {
    var value = document.getElementById('delfid').value;
    var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

    deleteNode(context, 50, 60);
    //deleteArrow(context);
    nodes--;
};

function deleteFromBack() {
    var value = document.getElementById('delbid').value;
    nodes--;
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

/*
function deleteArrow(context) {
	context.clearLine(250, 110);
}
*/