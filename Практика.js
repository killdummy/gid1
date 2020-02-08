var requestAnimFrame =  window.requestAnimationFrame ||
							window.webkitRequestAnimationFrame ||
							window.mozRequestAnimationFrame ||
							window.oRequestAnimationFrame ||
							window.msRequestAnimationFrame;

	var snowImage = new Image();
	snowImage.src = "photo/snow.png";
	var maybleImage = new Image();
	maybleImage.src = "photo/mayble.png";

	var ctxMap, map, mapWidth = 400, mapHeight = 600, isPlaying, snow = [], isSnow, isMayble;

	window.onload = function(){
		init();

		document.body.style.color = 'black';
		document.body.style.backgroundColor = 'white';
	}

	function init(){
		

		map = document.getElementById("canvas");
		ctxMap = map.getContext('2d');

		map.width = mapWidth;
		map.height = mapHeight;

		for (var i = 0; i < 80; i++){
			snow.push({
				x: Math.floor(Math.random() * mapWidth),
				y: Math.floor(Math.random() * mapHeight * 3),
				pH: 20,
				pW: 20,
				drawMayble: function(){
					ctxMap.drawImage(maybleImage, 0, 0, 150, 132, this.x, this.y, this.pW, this.pH);
				},
				draw: function(){
					ctxMap.drawImage(snowImage, 0, 0, 259, 259, this.x, this.y, this.pW, this.pH);
				}
			});
		}
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

	function stopLoop(){
		isPlaying = false;
	}

	function update(){
		draw();
	}

	function check(){
		var text = document.getElementsByTagName('input')[0].value;

		switch(text){
			case 'morgan':
				document.getElementById('lexa').style.display = 'block';
				break;
			case 'talka':
				document.getElementById('misha').style.display = 'block';
				break;
			case 'night':
				document.getElementById('pasha').style.display = 'block';
				break;
			case 'god':
				document.getElementById('igor').style.display = 'block';
				break;
			case 'pulpfiction':
				document.getElementById('anton').style.display = 'block';
				break;
			case 'understanding':
				document.getElementById('olya').style.display = 'block';
				break;
		}
	}

	function change(){
		if (document.body.style.color == 'white'){
			document.body.style.color = 'black';
			document.body.style.backgroundColor = 'white';
		}else{
			document.body.style.color = 'white';
			document.body.style.backgroundColor = 'black';
		}
	}

	function draw(){
		ctxMap.clearRect(0, 0, mapWidth, mapHeight);

		for (var i = 0; i < 80; i++){
			if (isMayble){
				snow[i].drawMayble();
			}else{
				snow[i].draw();
			}
			
			snow[i].y += 1;
			if (snow[i].y > mapHeight) snow[i].y = Math.floor(Math.random() * mapHeight - mapHeight);
		}
	}

	function changeSnow(){
		if (isSnow){
			stopLoop();
			isSnow = false;
			ctxMap.clearRect(0, 0, mapWidth, mapHeight);
		}else{
			startLoop();
			isSnow = true;
		}
	}

	function changeMayble(){
		if (isMayble){
			isMayble = false;
		}else{
			isMayble = true;
		}
	}
