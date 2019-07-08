window.onload = init;

var ctxMap, map, mapWidth = 1000, mapHeight = 500;
var rightPressed = false, leftPressed = false, jumpPressed = false;
var heroImage = new Image();
heroImage.src = "https://static2.gamekit.com/i/180/180/upload/16/11/12/99/48/63/994863_.png";
var mapImage = new Image();
mapImage.src = "";
var bulletImage = new Image();
bulletImage.src = "https://img1.picmix.com/output/stamp/tiny/1/5/2/4/304251_b01df.png";
var isPlaying;
var bullet = [], timer = 0, bullets = 0, i = 0, j = 0, orientation = 0;


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
				orientation = 0;
				break;
			case 37:
				leftPressed = true;
				orientation = 1;
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
	draw: function(){
		ctxMap.drawImage(heroImage, 0, 0, 180, 180, this.x, this.y, this.pW, this.pH);
	}
}

var drawBullet = {
	draw: function(){
		ctxMap.drawImage(bulletImage, 0, 0, 60, 58, bullet[i].x, bullet[i].y, 50, 50);
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
        player.y = -(3 * player.jumpLength * Math.sin(Math.PI * player.jumpCount / player.jumpLength))+350;
    } 

    if(player.jumpCount > player.jumpLength){
    	player.jumpCount = 0;
    	jumpPressed = false;
    	player.y = 350;
	}

	for (i = 0; i < bullet.length; i++){
        bullet[i].x += bullet[i].move;
		drawBullet.draw();
		if ((bullet[i].x > mapWidth) || (bullet[i].x < 0)) bullet.splice(i, 1);
	}

	timer++;

	if (timer % 12 == 0){
		bullets = 0;
	}

	addEventListener("keydown", function(event){
		switch(event.keyCode){
			case 32:
				if (bullets <= 10){
                    if (orientation == 0){
                        bullet.push({
                            x: player.x + player.pW/2,
                            y: player.y + player.pH/2,
                            vx: 10,
                            vy: 0,
                            move: 10
                        });
                    }else {
                        bullet.push({
                            x: player.x + player.pW/2,
                            y: player.y + player.pH/2,
                            vx: 10,
                            vy: 0,
                            move: -10
                        });
                    }					
				bullets += 1;
				}
				break;
		}
	});
}
