window.onload = init;

var ctxMap, map, mapWidth = 1000, mapHeight = 500;
var rightPressed = false, leftPressed = false, jumpPressed = false;
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

	addEventListener("keydown", function(event){
		switch(event.keyCode){
			case 39:
				rightPressed = true;
				break;
			case 37:
				leftPressed = true;
				break;
			case 38:
				jumpPressed = true;
				break;
		}
	});

	addEventListener("keyup", function(event){
		switch(event.keyCode){
			case 39:
				rightPressed = false;
				break;
			case 37:
				leftPressed = false;
				break;
		}
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
	speed: 8,
	jumpCount: 0,
	jumpLength: 50,
	jumpHeight: 350,
	draw: function(){
		ctxMap.drawImage(heroImage, 0, 0, 180, 180, this.x, this.y, this.pW, this.pH);
	}
}

function draw(){
	ctxMap.clearRect(0, 0, mapWidth, mapHeight);
	player.draw();

	if (rightPressed) {
        player.x += player.speed;
    }

    if (leftPressed) {
        player.x -= player.speed;
    } 

    if (jumpPressed) {
        player.jumpCount++;
        player.y = 200+(3 * player.jumpLength * Math.sin(Math.PI * player.jumpCount / player.jumpLength));
    } 

    if(player.jumpCount > player.jumpLength){
    	player.jumpCount = 0;
    	jumpPressed = false;
    	player.y = 350;
	}
}
