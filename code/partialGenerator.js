inlets = 1;
outlets = 1;

var myval=0;
var xoffset = 420;
var xspread = 0;

var yoffset = 10;
var yspread = 60;
var numpartials = 10;

var objectArray = new Array();
var thistimbre = 1;

if (jsarguments.length>1){
	myval = jsarguments[1];
}

function bang()
{
	clear();
	
	for (i = 0; i < numpartials; i++){
		
		var a = this.patcher.newdefault(xoffset+ (i*xspread), //x position
								yoffset + (yspread*i), //y position
								"onepartial", //object name
								i+2, // arg1: partial
								(numpartials-i+1)/10); //arg2: amp
								
		objectArray.push(a);
	}


	outlet(0,"myvalue","is",myval);
}


function clear(){
	
	for (i = 0; i < objectArray.length; i++){
		this.patcher.remove(objectArray[i]);
	}
	
	objectArray = new Array();
}


function partials(p){
	numpartials = p;
	}
	
function timbrenumber(t){
	thistimbre = t;
	}

function partialsaslist(){
	
	// feed in a list: pairs [partial value, amp]
	var input = arrayfromargs(arguments);
		
	clear();
	
//	input= 2.2 0.9 3.3 0.8 4.4 0.6
//  length = 6, length/2=3
//  parita == 2.2,3.3, 4.4
	
	for (i = 0; i < input.length/2; i++){
		
		var a = this.patcher.newdefault(xoffset + (i*xspread), //x position
								yoffset + (yspread*i), //y position
								"onepartial", //object name
								input[i*2], // arg1: partial
								input[i*2+1], //arg2: amp
								"thefund", //arg3: fundamental source
								"toenvelope"); //arg4: amp
		objectArray.push(a);
								
		var b = this.patcher.newdefault(xoffset - 60 + (xspread * i),
 				yoffset + (yspread*i), "flonum");
								
		objectArray.push(b);
		
		var c = this.patcher.newdefault(xoffset + 205 + (xspread * i),
 				yoffset + (yspread*i), "flonum");
								
		objectArray.push(c);
		
		this.patcher.connect(b, 0, a, 0);
		this.patcher.connect(c, 0, a, 1);
		
		var d = this.patcher.newdefault(xoffset + 260 + (i*xspread), //x position
								yoffset + (yspread*i), //y position
								"function");
		var r = new Array();
		r[0] = xoffset + 260 + (i*xspread);
		r[1] = yoffset + (yspread*i); 
		r[2] = xoffset + 260 + (i*xspread) + 150;
		r[3] = yoffset + (yspread*i) + 50;
		
		d.rect = r;
		
		objectArray.push(d);

		this.patcher.connect(d, 1, a, 2);


	}
}