window.onload = init;

var ctxMap, map, mapWidth = 1000, mapHeight = 500;
var heroImage = new Image();
heroImage.src = "https://static2.gamekit.com/i/180/180/upload/16/11/12/99/48/63/994863_.png";
var mapImage = new Image();
mapImage.src = "";
var isPlaying;



var requestAnimFrame =  window.requestAnimationFrame ||
						window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame ||
						window.oRequestAnimationFrame ||
						window.msRequestAnimationFrame;

function init(){
	map = document.getElementById("canvas");
	ctxMap = map.getContext('2d');

	map.width = mapWidth;
	map.height = mapHeight;

	startLoop();

	document.body.addEventListener("keydown", function (e) {
    	player.keys[e.keyCode] = true;
	});
	document.body.addEventListener("keyup", function (e) {
    	player.keys[e.keyCode] = false;
	});
}

function loop(){
	if (isPlaying){
		update();
		requestAnimFrame(loop);
	}
}

function startLoop(){
	isPlaying = true;
	loop();
}

function storLoop(){
	isPlaying = false;
}

function update(){
	draw();
}

var player = {
	health: 100,
	mana: 100,
	x: 400,
	y: 350,
	pW: 150,
	pH: 150,
	velX: 0,
	keys: [],
	speed: 4,
	draw: function(){
		ctxMap.drawImage(heroImage, 0, 0, 180, 180, this.x, this.y, this.pW, this.pH);
	}
}

function draw(){
	ctxMap.clearRect(0, 0, mapWidth, mapHeight);
	player.draw();

	if (player.keys[39]) {
        player.x += player.speed;
    }
    if (player.keys[37]) {
        player.x -= player.speed;
    }   
}



