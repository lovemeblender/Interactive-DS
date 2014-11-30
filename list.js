var nodes = 0;
var lastX = 0;

function Node(value, next) {
	this.value = value;
	this.next = next;
}

function drawNode(context, x, y, value) {

	<!--Draw node-->
	context.strokeStyle = "black";
	context.lineWidth = 1;
	context.strokeRect(x, y, 140, 80);

	<!--Draw value box-->
	context.strokeStyle = "black";
	context.lineWidth = 1;
	context.strokeRect(x + 80, y + 10, 40, 20);
	if(value > 999) {
		value = 999;
	}
	if(value.length == 1) {
		context.fillText(value, x + 97, y + 23);
	}
	else if(value.length == 2) {
		context.fillText(value, x + 95, y + 23);
	}
	else {
		context.fillText(value, x + 92, y + 23);
	}

	<!--Draw next node box-->
	context.strokeStyle = "black";
	context.lineWidth = 1;
	context.strokeRect(x + 80, y + 40, 40, 20);
};

function deleteNode(context, x, y) {
	
	<!--Delete node-->
	context.clearRect(x, y, 140, 80);

	<!--Delete value box-->
	context.clearRect(x + 80, y + 10, 40, 20);

	<!--Delete next node box-->
	context.clearRect(x + 80, y + 40, 40, 20);

	// requestAnimationFrame(deleteNode);
};

function insertAtBack() {

	nodes++;

	if(nodes > 12) {
		alert("There is also a delete operation!");
	}

    //var value = document.getElementById('insfid').value;
    var value = Math.floor((Math.random() * 100) + 1); // Random integer [1-100]
    var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	if(nodes == 7) {
		drawNode(context, lastX, 170, value);
		context.moveTo(1150, 110);
 		context.lineTo(1150, 170);
		context.strokeStyle="#black";
		context.stroke();
		context.closePath();
		drawArrowhead(context, 1150, 170, true);
	}
	else if(nodes > 7) {
		drawArrow(context, lastX + 100, 220);
		lastX -= 200;
		drawNode(context, lastX, 170, value);
	}

	if(nodes == 1) {
		lastX = 50;
		drawNode(context, 50, 60, value);
		context.fillText("value:", 68, 82);
		context.fillText("next:", 68, 113);
	}
	else if(nodes > 1 && nodes < 7) {
		lastX += 200;
		drawArrow(context, lastX, 110);
		drawNode(context, lastX, 60, value);
	}

	/*
	*
	*   TODO - OBJECTS CREATION
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
		drawArrow(context, lastX, 110);
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
    deleteArrow(context);
    nodes--;
};

function deleteFromBack() {
    var value = document.getElementById('delbid').value;
    
    nodes--;
};

function initCanvas() {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	nodes = 0;
    lastX = 0;

	<!--Draw outer frame-->
	context.strokeStyle = "#6E0000";
	context.lineWidth = 5;
	context.strokeRect(0, 0, 1200, 300);

	<!--Draw init node reference-->
	context.strokeStyle = "black";
	context.lineWidth = 1;
	context.strokeRect(60, 10, 40, 20);
	context.fillText("head", 68, 22);

	<!--Draw init vertical arrow-->
	context.moveTo(80, 30);
 	context.lineTo(80, 60);
	context.strokeStyle="#black";
	context.stroke();
	context.closePath();
	drawArrowhead(context, 80, 60, true);

    //deleteNode(context, 250, 100);
};

/*
* TODO - Rewrite arrow functions
*
*/

function deleteArrow(context) {
	context.clearLine(250, 110);
}

function drawArrow(context, x, y) {
	context.moveTo(x - 100, y);
 	context.lineTo(x, y);
	context.strokeStyle = "#black";
	context.stroke();
	context.closePath();
    drawArrowhead(context, x, y);
};

function drawArrowhead(ctx, x, y, vertical) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    if(vertical) {
    	ctx.rotate(90 * Math.PI / 2);
    }
    else {
    	ctx.rotate(Math.PI / 2);
    }
    ctx.moveTo(0, 0);
    ctx.lineTo(3, 16);  <!--Change arrow head size-->
    ctx.lineTo(-3, 16); <!--Change arrow head size-->
    ctx.closePath();
    ctx.restore();
    ctx.fill();
};