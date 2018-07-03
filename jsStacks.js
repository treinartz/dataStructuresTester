'use strict';
var myStack;
var myRect;
var on = false;
var button;
var r;
//this ES6 JS stack app accomplishes the following:
//creates a stack object with an array of rects
//creates a button class (but could have used dom.js:  var button=createButton("reSet") from https://www.youtube.com/watch?v=lm8Y8TD4CTM)
//has a static method that I do not use called triple
//uses a numbering system for each rect that is passed as parameter
//distinguishes between a click and a display with some boolean variables
//uses 2 ways to pop; 1: using array splice; 2: using object delete
function setup() {
	canvas = createCanvas(750, 400);
	myStack = new Stack();
	myRect = new Rectangles();
	button = new Buttons();
	fill(0, 0, 255);
	r = createGraphics(100, 100);
}

function draw() {
	background(100);
	r.rect(r.width / 2, r.width / 2, 50, 50);
	r.background(0, 0, 255);
	image(r, 50, 50);
	smooth();
	fill(255);
	textSize(14);
	text("Stacks! \n\nFirst in, \nFirst out: \nFIFO!", 65, 75);
	//image(r, 0, 0, 50, 50);

	for (var i = 0; i < myStack._length; i++) {
		if (myStack._storage.rects[i].contains(mouseX, mouseY)) {
			myStack._storage.rects[i].changeColor(255);
		} else {
			myStack._storage.rects[i].changeColor(0);
		}
		myStack._storage.rects[i].display();
	}

	fill(50, 50, 50);
	button.makeButton(20, 315);
	fill(255);
	text("push", 25, 340);

	fill(100, 100, 100);
	button.makeButton(65, 315);
	fill(255);
	text("pop", 75, 340);
}

function mousePressed() {
	button.clicked();
	for (var i = 0; i < myStack._length; i++) {
		if (myStack._storage.rects[i].contains(mouseX, mouseY)) {
			console.log("geterdone");
			myStack._storage.rects[i].changeColor();
		}
	}
}

class Buttons {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.w = 40;
		this.h = 40;
		this.change = 360;
		this.count=0;
	}

	makeButton(x, y) {
		rect(x, y, this.w, this.h);
	}
	clicked() {
		if ((mouseX > 65 && mouseX < 105 && mouseY > 315 && mouseY < 355)) {
			cursor(HAND);
			myStack.pop();
			this.change = this.change + 45;
			this.count=this.count-=1;
			console.log(myStack);

		} else if ((mouseX > 20 && mouseX < 60 && mouseY > 315 && mouseY < 355)) {
			cursor(HAND);
			this.change = this.change - 45;
			this.count=this.count+=1;
			myStack.push(new Rectangles(this.change, this.count));
			console.log(myStack);
		}
	}
}
class Rectangles {
	constructor(c, c1) {
		this.x = width / 2;
		this.y = c;
		this.w = 40;
		this.h = 40;
		this.r = 20;
		this.brightness = 150;
		this.c1=c1;
	}

	static triple(n) {
		if (n === undefined) {
			n = 1;
		}
		return n - 45;
	}

	contains(px, py) {
		let d = dist(px, py, this.x, this.y);
		if (d < this.r) {
			return true;
		} else {
			return false;
		}
	}
	changeColor(num) {
		this.brightness = num;

	}
	display() {
		var str = this.c1.toString();
		fill(255, 0, this.brightness);
		rect(this.x, this.y, this.w, this.h);
		fill(255);
		text(str, this.x+5, this.y+25);
	}
}

class Stack {
	constructor() {
		this._storage = {
			name: "jim",
			rects: [],
			count: 0
		}
		this._length = 0;
	}

	push(value) {
		//TODO: add typechecking and check arguments
		this._storage.rects[this._length] = value;
		this._length++;
	}

	pop() {
		// what if it is empty?
		if (this._length) {
			const lastVal = this._storage[this._length - 1];
			delete this._storage.rects[this._length - 1];
			//this._storage.rects.splice(this._length - 1, 1);
			this._length--;
			return lastVal;
		}
	}

	peek() {
		if (this._length) {
			return this._storage[this._length - 1];
		}
	}
}
