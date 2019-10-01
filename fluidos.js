
var cuadricula, cuadricula_cambio;
var  da=1.0;
var db=0.5;
var f=0.0367;
var k=0.065;


function setup(){
    
 cnv = createCanvas(250,250);
 pixelDensity(1);

 cuadricula=[];
 cuadricula_cambio=[];


for(var x=0; x<width;x++){
  cuadricula[x]=[];
  cuadricula_cambio[x]=[];

for (var y=0; y<height;y++){

  cuadricula[x][y]={b:0,a:1};
  cuadricula_cambio[x][y]={b:0,a:1};

}
}
 
for(var i=100; i<150;i++){ 
	for(var j=100; j<150;j++){ 
cuadricula[i][j].b=1;
}
}
}

function draw(){
background(70);
//saveframe("jpg/patron.jpg");
for(var x=1; x<width-1;x++){
for (var y=1; y<height-1;y++){
var a= cuadricula [x][y].a;
var b= cuadricula [x][y].b;

cuadricula_cambio [x][y].a= a + 
   
   ((da * triangleA(x,y)) -
	(a * b * b ) +
	(f * (1-a)))*1.0;


cuadricula_cambio [x][y].b= b + 
   ((db * triangleB(x,y))+
	(a * b * b) -
	((k+f) * b))*1.5;

cuadricula_cambio[x][y].a=constrain(cuadricula_cambio[x][y].a,0,1);
cuadricula_cambio[x][y].b=constrain(cuadricula_cambio[x][y].b,0,1);
}
    
    
}



loadPixels();
for(var x=0; x<width;x++){
for (var y=0; y<height;y++){

var pix=( x + y * width ) * 4;

pixels[pix+0]= floor(cuadricula_cambio [x][y].b*255);

//pixels[pix+0]= 0
//pixels[pix+1]= floor(cuadricula_cambio [x][y].a*255);
//pixels[pix+3]= 255;

  }
 }
updatePixels();
swap();

}

function triangleA(x,y){

	var sumA=0;

	sumA += cuadricula[x][y].a*-1;
	sumA += cuadricula[x-1][y].a * 0.2;
	sumA += cuadricula[x+1][y].a * 0.2;
	sumA += cuadricula[x][y+1].a * 0.2;
	sumA += cuadricula[x][y-1].a * 0.2;
	sumA += cuadricula[x-1][y-1].a * 0.05;
	sumA += cuadricula[x+1][y-1].a * 0.05;
	sumA += cuadricula[x+1][y+1].a * 0.05;
	sumA += cuadricula[x-1][y+1].a * 0.05;
	

	return sumA;
}

function triangleB(x,y){

	var sumB=0;

	sumB += cuadricula[x][y].b*-1;
	sumB += cuadricula[x-1][y].b * 0.2;
	sumB += cuadricula[x+1][y].b * 0.2;
	sumB += cuadricula[x][y+1].b * 0.2;
	sumB += cuadricula[x][y-1].b * 0.2;
	
	sumB += cuadricula[x-1][y-1].b * 0.05;
	sumB += cuadricula[x+1][y-1].b * 0.05;
	sumB += cuadricula[x+1][y+1].b * 0.05;
	sumB += cuadricula[x-1][y+1].b * 0.05;


	return sumB;
}
function swap(){
var cambio=cuadricula;
	cuadricula=cuadricula_cambio;
	cuadricula_cambio=cambio;
}

