window.requestAnimaFrame = (function(){
	 return window.requestAnimationFrame ||
	         window.webkitRequestAnimationFrame ||
	         window.mozRequestAnimationFrame ||
	         function(callback){
	         	window.setTimeout(callback,1000/60);
	         };
})();
var c = document.getElementById("myCanvas");
c.width = window.innerWidth;           //画布和浏览器等宽等高
c.height = window.innerHeight;
var canvasW = c.width;
var canvasH = c.height;
var cxt = c.getContext("2d");          //画笔

var particleColor = "rgba(0,0,0,.1)",
    colorSet = [
         "Aqua",
         "BlueViolet",
         "CornflowerBlue",
         "DeepPink",
         "Gold",
         "SpringGreen",
         "Tomato"
    ];

function Particle(){           //构造函数
	this.x = randomMax(canvasW);
	this.y = randomMax(canvasH);
	this.r = randomMax(100);
	this.dx = -5+randomMax(10); 
	this.dy = -5+randomMax(10);
	this.color = colorSet[Math.floor(Math.random() * colorSet.length)];
}
Particle.prototype.draw = function(){
	this.x += this.dx;
	this.y += this.dy;
	if(this.y > c.height || this.x <0 || this.x >c.width || (this.dy===0 && this.x===0)){
		this.x = randomMax(canvasW);
		this.y = randomMax(canvasH);
		this.dx = -5+randomMax(10); 
		this.dy = -5+randomMax(10);
	}
	cxt.beginPath();
	var fillstyle = cxt.createRadialGradient(this.x,this.y,this.r*0.001,this.x,this.y,this.r); //圆背景颜色渐变
	fillstyle.addColorStop(0,this.color);
	fillstyle.addColorStop(1,particleColor);
	cxt.fillStyle = fillstyle;
	cxt.arc(this.x,this.y,this.r,0,Math.PI*2,false);
	cxt.fill();
	cxt.closePath();
}
/* var particles = new Particle(); //创建单个
   particles.draw();
*/
//创建多个
var particles = [];
for(var i=0;i<70;i++){
	particles.push(new Particle());
}
for(var i=0;i<particles.length;i++){
	particles[i].draw();
}
function loop(){
	cxt.clearRect(0,0,canvasW,canvasH);
    requestAnimaFrame(loop)
    for(var i=0;i<particles.length;i++){
    	particles[i].draw();
    }
};
loop();
function randomMax(max){
	return Math.floor(Math.random()*max)
}
console.log(particles);
