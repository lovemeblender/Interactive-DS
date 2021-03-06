var nodes = 0; // number of nodes
var lastX = 0; // current x co-ordinates
var lastY = 60; // current y co-ordinates
var elements = []; // the list as an array

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

function drawNodeSecondRow(context, x, y, value) {

	<!--Draw node-->
	context.strokeStyle = "black";
	context.lineWidth = 1;
	context.strokeRect(x, y, 120, 75);

	<!--Draw value box-->
	context.strokeStyle = "black";
	context.lineWidth = 1;
	context.strokeRect(x + 5, y + 10, 33, 20);
	context.fillText(value, x + 16, y + 23);

	<!--Draw next node box-->
	context.strokeStyle = "black";
	context.lineWidth = 1;
	context.strokeRect(x + 5, y + 40, 33, 20);
};

function deleteNodeBack(context, x, y) {
	
	nodes--;
	elements[nodes] = undefined;
	<!-- DEBUGGING -->
	/*
		context.clearRect(98, 0, 200, 30);
		context.fillText(nodes, 100, 15);

		context.clearRect(300, 0, 800, 20);
		var a = 0;
		for(i = 0; i < nodes; i++) {
			if(elements[i] !== undefined)
			context.fillText(i+": "+elements[i]+",", 300 + a, 15);
			a += 45;
		}
	*/
	<!-- DEBUGGING -->
	
	if (nodes == 0) {
		<!--Delete node-->
		context.clearRect(x - 1, y - 1, 200, 81);
	}
	else if(nodes == 1) {
		<!--Delete node-->
		context.clearRect(x - 1, y - 1, 200, 81);
	
		<!--Delete previous node-->
		context.clearRect(x - 201, y - 1, 200, 81);

		<!--Re-draw previous node-->
		drawNode(context, lastX - 200, 60, elements[nodes - 1]);

		context.fillText("value:", 65, 82); // add value label
		context.fillText("next:", 65, 113); // add next label

		lastX -= 200;
	}
	else if(nodes > 1 && nodes < 6) {
		<!--Delete node-->
		context.clearRect(x - 1, y - 1, 200, 81);
	
		<!--Delete previous node-->
		context.clearRect(x - 201, y - 1, 200, 81);

		<!--Re-draw previous node-->
		var value = elements[nodes - 1];
		drawNode(context, lastX - 200, 60, value);

		lastX -= 200;
	}
	else if(nodes == 6) {
		<!--Delete node-->
		context.clearRect(x - 1, y - 1, 200, 81);
	
		<!--Delete previous node on upper node-->
		context.clearRect(x - 1, y - 111, 200, 110);

		<!--Re-draw previous node-->
		var value = elements[nodes - 1];
		drawNode(context, lastX, 60, value);

		lastY = 60;
	}
	else if(nodes > 6) {
		<!--Delete node-->
		context.clearRect(x - 1, y - 1, 200, 81);
	
		<!--Delete previous node-->
		context.clearRect(x + 199, y - 1, 122, 81);

		<!--Re-draw previous node-->
		var value = elements[nodes - 1];
		drawNodeSecondRow(context, lastX + 200, 170, value);

		lastX += 200;
	}
	if(nodes == 0) {
		elements = [];
	}
};

function deleteNodeFront(context, x, y) {
	
	nodes--;
	elements.shift();

	<!-- DEBUGGING -->
	/*
		context.clearRect(98, 0, 200, 30);
		context.fillText(nodes, 100, 15);

		context.clearRect(300, 0, 800, 20);
		var a = 0;
		for(i = 0; i < nodes; i++) {
			if(elements[i] !== undefined)
			context.fillText(i+": "+elements[i]+",", 300 + a, 15);
			a += 45;
		}
	*/
	<!-- DEBUGGING -->

	if (nodes == 0) {
		<!--Delete node-->
		context.clearRect(x - 1, y - 1, 200, 81);
	}
	else if(nodes == 1) {
		<!--Delete node-->
		context.clearRect(x - 1, y - 1, 200, 81);
	
		<!--Delete previous node-->
		context.clearRect(x - 201, y - 1, 200, 81);

		<!--Re-draw previous node-->
		drawNode(context, lastX - 200, 60, elements[0]);

		lastX -= 200;
	}
	else if(nodes > 1 && nodes < 6) {
		
		context.clearRect(19, 59, canvas.width, canvas.height); // clear canvas
	
		<!--Re-draw all nodes-->
		var tempX = 20;
		for(i = 0; i < nodes; i++) {
			if(i!=0) drawLine(context, tempX - 100, 110, tempX, 110);
			drawNode(context, tempX, 60, elements[i]);
			tempX += 200;
		}
		
		lastX -= 200;
	}
	else if(nodes == 6) {

		context.clearRect(19, 59, canvas.width, canvas.height); // clear canvas

		<!--Re-draw all nodes-->
		var tempX = 20;
		for(i = 0; i < nodes; i++) {
			if(i!=0) drawLine(context, tempX - 100, 110, tempX, 110);
			drawNode(context, tempX, 60, elements[i]);
			tempX += 200;
		}

		lastY = 60;
	}
	else if(nodes > 6) {
		context.clearRect(19, 59, canvas.width, canvas.height); // clear canvas

		<!--Re-draw all first row nodes-->
		var tempX = 20;
		for(i = 0; i < 6; i++) {
			if(i!=0 && i!=6) drawLine(context, tempX - 100, 110, tempX, 110);
			drawNode(context, tempX, 60, elements[i]);
			tempX += 200;
		}

		lastX += 200;

		<!--Re-draw 7th node-->
		drawNodeSecondRow(context, 1020, 170, elements[6]);
		context.moveTo(1150, 110);
 		context.lineTo(1150, 170);
		context.strokeStyle="#black";
		drawVerticalLine(context, 200 , 50);
		drawArrowhead(context, 1118, 170, true);
		lastY = 170;

		<!--Re-draw all second row nodes-->
		var tempX = 820;
		for(i = 7; i < 12; i++) {
			if(elements[i] !== undefined) {
				drawLine(context, tempX + 120, 220, tempX + 220, 220);
				drawNodeSecondRow(context, tempX, 170, elements[i]);
				tempX -= 200;
			}
		}
		
	}
	if(nodes == 0) {
		elements = [];
	}
	else {
		context.fillText("value:", 65, 82); // add value label
		context.fillText("next:", 65, 113); // add next label
	}
	
};

function insertAtBack() {

	nodes++;
	
	if(nodes > 12) {
		alert("There is also a delete operation!");
		nodes--;
	}
	else {

    	var value = Math.floor((Math.random() * 99) + 1); // Value of the node, random integer [1-99]
    	var canvas = document.getElementById("canvas"); // get canvas
		var context = canvas.getContext("2d"); // get context

		elements[nodes - 1] = value;

		<!-- DEBUGGING -->
		/*
		context.clearRect(98, 0, 200, 30);
		context.fillText(nodes, 100, 15);

		context.clearRect(300, 0, 800, 20);
		var x = 0;
		for(i = 0; i < 12; i++) {
			if(elements[i] !== undefined) {
				context.fillText(i+": "+elements[i]+", ", 300 + x, 15);
				x += 45;
			}
		}
		*/
		<!-- DEBUGGING -->

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
			drawNodeSecondRow(context, lastX, 170, value);
			context.moveTo(1150, 110);
 			context.lineTo(1150, 170);
			context.strokeStyle="#black";
			drawVerticalLine(context, 200 , 50);
			drawArrowhead(context, 1118, 170, true);
			lastY = 170;
		}
		else if(nodes > 7 && nodes < 13) {
			lastX -= 200;
			drawLine(context, lastX + 120, 220, lastX + 220, 220); // draw a line of length 180
			drawNodeSecondRow(context, lastX, 170, value);
		}

	}
};

function insertAtFront() {

	nodes++;
	
	if(nodes > 12) {
		alert("There is also a delete operation!");
		nodes--;
	}
	else {

    	var value = Math.floor((Math.random() * 99) + 1); // Value of the node, random integer [1-99]
    	var canvas = document.getElementById("canvas"); // get canvas
		var context = canvas.getContext("2d"); // get context
		
		elements.unshift(value);

		<!-- DEBUGGING -->
		/*
		context.clearRect(98, 0, 200, 30);
		context.fillText(nodes, 100, 15);

		context.clearRect(300, 0, 800, 20);
		var x = 0;
		for(i = 0; i < 13; i++) {
			if(elements[i] !== undefined)
			context.fillText(i+": "+elements[i]+",    ", 300 + x, 15);
			x += 25;
		}
		*/
		<!-- DEBUGGING -->

		if(nodes == 1) { // draw the first node at (20, 60)
			lastX = 20;
			drawNode(context, lastX, 60, value);
			context.fillText("value:", 65, 82); // add value label
			context.fillText("next:", 65, 113); // add next label
		}
		else if(nodes > 1 && nodes < 7) {
			lastX += 200;
			
			context.clearRect(19, 59, canvas.width, canvas.height); // clear canvas

			var tempX = lastX;
			for(i = nodes; i >= 0; i--) {
				if(elements[i] !== undefined) {
					if(i!=0) drawLine(context, tempX - 100, 110, tempX, 110); // draw an arrow, don't put it in front of the first node
					drawNode(context, tempX, 60, elements[i]);
					tempX -= 200;
				}
			}
			context.fillText("value:", 65, 82); // add value label
			context.fillText("next:", 65, 113); // add next label
		}
		else if(nodes == 7) { // draw the 7th node on the 2nd row

			context.clearRect(19, 59, canvas.width, canvas.height); // clear canvas

			var tempX = lastX;
			for(i = nodes - 2; i >= 0; i--) {
				if(elements[i] !== undefined) {
					if(i!=0) drawLine(context, tempX - 100, 110, tempX, 110); // draw an arrow, don't put it in front of the first node
					drawNode(context, tempX, 60, elements[i]);
					tempX -= 200;
				}
			}
			context.fillText("value:", 65, 82); // add value label
			context.fillText("next:", 65, 113); // add next label

			drawNodeSecondRow(context, lastX, 170, elements[nodes - 1]);
			context.moveTo(1150, 110);
 			context.lineTo(1150, 170);
			context.strokeStyle="#black";
			drawVerticalLine(context, 200 , 50);
			drawArrowhead(context, 1118, 170, true);
			lastY = 170;
		}
		else if(nodes > 7 && nodes < 13) {
			lastX -= 200;

			context.clearRect(19, 59, canvas.width, canvas.height); // clear canvas

			// second row
			var srow = nodes - 7; // nodes [8, 12], srow [1, 5]
			tempX = lastX;
			for(i = srow; i > 0; i--) {
				if(elements[i] !== undefined) {
					if(i!=0) drawLine(context, tempX + 120, 220, tempX + 220, 220); // draw a line of length 180
					drawNodeSecondRow(context, tempX, 170, elements[ 6 + i ]);
					tempX += 200;
				}
			}
			// draw 7th node
			drawNodeSecondRow(context, tempX, 170, elements[ 6 ]);
			context.moveTo(1150, 110);
 			context.lineTo(1150, 170);
			context.strokeStyle="#black";
			drawVerticalLine(context, 200 , 50);
			drawArrowhead(context, 1118, 170, true);

			// draw upper nodes
			for(i = 5; i >= 0; i--) {
				if(elements[i] !== undefined) {
					if(i!=0)drawLine(context, tempX - 100, 110, tempX, 110); // draw an arrow, don't put it in front of the first node
					drawNode(context, tempX, 60, elements[i]);
					tempX -= 200;
				}
			}

			context.fillText("value:", 65, 82); // add value label
			context.fillText("next:", 65, 113); // add next label
		}
	}
};

function clearAll() {
    
    var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    elements = [];

	initCanvas();    
};

function deleteFromFront() {
    
    var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

    if(nodes > 0) deleteNodeFront(context, lastX, lastY);
};

function deleteFromBack() {
    
    var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

    if(nodes > 0) deleteNodeBack(context, lastX, lastY);
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