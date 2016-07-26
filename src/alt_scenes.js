var x = 'x';
var y = 'y';
var xy = 'xy';
var board;

var sceneSet = function(list) {
	for (i=0; i < list.length; i++) {
		for (j=0; j < list[i].length; j++) {
			//[blockClass, blockColor, attr1(name), attr2(type)]
			//Rock(  38,         10,     1,       1,      red,  'RockCover', 'Unlock', 'Right');
			ex = j, wy = i;
			//console.log(wy +',' +ex);
			make = list[wy][ex];
			rockClass = make[0], rockColor = make[1], rockName = make[2], rockType = make[3]; 
			//console.log(rockClass + ' ' + rockColor + ' ' + rockName + ' ' + rockType);
			if (rockClass == "00" || typeof rockClass == 'undefined') continue;
			//COPIED ROCK FUNCTION
			if (rockClass === undefined || rockClass === "") {
				if (rockName === 'Anti') {
					Crafty.e('TinyGround').at(ex + 0.15, wy + 0.7);
					Crafty.e('RockTB').at(ex + 0.15, wy);
					Crafty.e('RockLR').at(ex, wy + 0.13);
					if (rockColor == 'clear') {
						if (debug == false) Crafty.e('RockCover').at(ex, wy).removeComponent('Color').attr({name: rockName, type: rockType});
					} else {
						if (debug == false) Crafty.e('RockCover').at(ex, wy).color(rockColor).attr({name: rockName, type: rockType});
					}
				} else {
					Crafty.e('TinyGround').at(ex + 0.15, wy);
					Crafty.e('RockTB').at(ex + 0.15, wy + 0.2);
					Crafty.e('RockLR').at(ex, wy + 0.33);
					if (rockColor == 'clear') {
						if (debug == false) Crafty.e('RockCover').at(ex, wy - 0.05).removeComponent('Color').attr({name: rockName, type: rockType});
					} else {
						if (debug == false) Crafty.e('RockCover').at(ex, wy - 0.05).color(rockColor).attr({name: rockName, type: rockType});
					}
				}	
			} else if (rockClass === 'ColorCover') {
				if(rockName === 'ColorZone') {
					Crafty.e('TinyGround').at(ex + 0.15, wy);
					Crafty.e('RockTB').at(ex + 0.15, wy + 0.2);
					Crafty.e('RockLR').at(ex, wy + 0.33);
					if (rockColor == 'clear') {
						if (debug == false) Crafty.e('ColorCover').at(ex, wy - 0.05).removeComponent('Color').attr({name: rockName, type: rockType});
					} else {
						if (debug == false) Crafty.e('ColorCover').at(ex, wy - 0.05).color(rockColor).attr({name: rockName, type: rockType});
					}
				} else if (rockName === 'AntiColorZone') {
					Crafty.e('TinyGround').at(ex + 0.15, wy + 0.7);
					Crafty.e('RockTB').at(ex + 0.15, wy);
					Crafty.e('RockLR').at(ex, wy + 0.13);
					if (rockColor == 'clear') {
						if (debug == false) Crafty.e('ColorCover').at(ex, wy).removeComponent('Color').attr({name: rockName, type: rockType});
					} else {
						if (debug == false) Crafty.e('ColorCover').at(ex, wy).color(rockColor).attr({name: rockName, type: rockType});
					}
				}
			} else {
				if (rockColor == 'clear') {
					Crafty.e(rockClass).at(ex, wy - 0.05).removeComponent('Color').attr({name: rockName, type: rockType});
				} else {
					Crafty.e(rockClass).at(ex, wy - 0.05).color(rockColor).attr({name: rockName, type: rockType});
				}
			}
			//END COPY
		}
	}
	//console.log('scene set done');
};

Crafty.scene('Onward', function(toPrint) {
	start();
	Crafty.e('RockCover').attr({x:0, y:100, w:800, h:100}).color('black');
	if (wipe() == 0) Message(130, 135, 400, 3, toPrint[0], '#FF0000', toPrint[1]);
	if (wipe() == 1) Message(130, 135, 400, 3, Welcome(), '#FF0000', 10000);
	if (wipe() == 0) {
		this.start_game = function() {
			trans++;
			Crafty.scene('Onward');
		}
	} else {
		this.start_game = function() {
			trans = 0;
			Crafty.scene(Lev());
		}
	}
	
	//Start Button
	var pauseBtn = Crafty.e('Blank').at(0, 0).bind('KeyDown', this.start_game);
	
	//Start Click
	//var startBtn = Crafty.e('PIcon').at(0, 0).bind('Click', this.start_game)
	var startBtn = Crafty.e('PIcon').at(0, 0).bind('TouchStart', this.start_game);
});

Crafty.scene('LevelTest', function() {
	fresh = true;
	numbers = specialSceneList[14][100][3].split(','), ex = numbers[0], wy = numbers[1];
	checkPoint[0] = ex, checkPoint[1] = wy;
	
	//Player
	var player = Crafty.e('Guy');
	start();
	Crafty.viewport.follow(player, -100, 100);
	
	//PAUSE BUTTON
	var pauseBtn = Crafty.e('Blank').at(0, 0).bind('KeyDown', function(e) {
		if(e.key == pauseKey) {
			var first_entity = Crafty("Canvas").get(0);
			player.playerPause(first_entity);
		}
	});
	
	
	sceneSet(specialSceneList);
	console.log('Player Start point is: ' + checkPoint[0] + ',' + checkPoint[1]);
	player.at(checkPoint[0], checkPoint[1]);
	
});

Crafty.scene('Level1', function() {
	if (fresh) {
		currentSceneList = Game.copyArr(sceneList1);
		numbers = currentSceneList[14][100][3].split(','), ex = numbers[0], wy = numbers[1];
		checkPoint[0] = ex, checkPoint[1] = wy;
		fresh = false;
	}
	//Player
	var player = Crafty.e('Guy');
	start();
	Crafty.viewport.follow(player, -100, 100);
	
	//PAUSE BUTTON
	var pauseBtn = Crafty.e('Blank').at(0, 0).bind('KeyDown', function(e) {
		if(e.key == pauseKey) {
			var first_entity = Crafty("Canvas").get(0);
			player.playerPause(first_entity);
		}
	});
	

	sceneSet(currentSceneList);
	player.at(checkPoint[0], checkPoint[1]);
	
	/* //Touch Controls
	var up = Crafty.e('Button').attr({y: 300}).bind('EnterFrame', function() {this.x = player.x;});
		up.set(0);
	var down = Crafty.e('Button').attr({y: 400}).bind('EnterFrame', function() {this.x = player.x;});
		down.set(1);
	var left = Crafty.e('Button').attr({y: 350}).bind('EnterFrame', function() {this.x = player.x - 50;});
		left.set(2);
	var right = Crafty.e('Button').attr({y: 350}).bind('EnterFrame', function() {this.x = player.x + 50;});
		right.set(3);
	var pause = Crafty.e('Button').attr({y: 350}).color('red').bind('EnterFrame', function() {this.x = player.x;});
		pause.set(4); */
	
	//FALLUPFIX
	player.bind("CheckLanding", function(ground) {
		//console.log(ground);
		if (ground.ID == 'ground') { // allow landing, if player's feet are not above ground
			player.canLand = true;
		}
	});
	//END FIX
	
	Message(330, 115, 1200, 3, 'Bradley,',  '#FFFFFF', 99999);
    Message(330, 135, 1200, 3, 'Warning! Sometimes you need to blend in with your surroundings.',  '#FFFFFF', 99999);
    Message(330, 155, 1200, 3, 'Try Tapping the Orange Bar to match your color to the next room.',  '#FFFFFF', 99999);

});
	
Crafty.scene('Level2', function() {
	if (fresh) {
		numbers = currentSceneList[14][100][3].split(','), ex = numbers[0], wy = numbers[1];
		currentSceneList = Game.copyArr(sceneList2);
		checkPoint[0] = ex, checkPoint[1] = wy;
		fresh = false;
	}
	
	//Player
	var player = Crafty.e('Guy');
	start();
	Crafty.viewport.follow(player, -100, 100);
	
	//PAUSE BUTTON
	var pauseBtn = Crafty.e('Blank').at(0, 0).bind('KeyDown', function(e) {
		if(e.key == pauseKey) {
			var first_entity = Crafty("Canvas").get(0);
			player.playerPause(first_entity);
		}
	});
	
	//Pause Click
	var pauseClk = Crafty.e('PIcon').at(0, 0).bind('Click', function() {
		var first_entity = Crafty("Canvas").get(0);
		player.playerPause(first_entity);
	});

	sceneSet(currentSceneList);
	player.at(checkPoint[0], checkPoint[1]);
	console.log('Player Start point is: ' + checkPoint[0] + ',' + checkPoint[1]);
});

Crafty.scene('Level3', function() {
	if (fresh) {
		numbers = currentSceneList[14][100][3].split(','), ex = numbers[0], wy = numbers[1];
		currentSceneList = Game.copyArr(sceneList3);
		checkPoint[0] = ex, checkPoint[1] = wy;
		fresh = false;
	}
	
	//Player
	var player = Crafty.e('Guy');
	start();
	Crafty.viewport.follow(player, -100, 100);
	
	//PAUSE BUTTON
	var pauseBtn = Crafty.e('Blank').at(0, 0).bind('KeyDown', function(e) {
		if(e.key == pauseKey) {
			var first_entity = Crafty("Canvas").get(0);
			player.playerPause(first_entity);
		}
	});
	
	//Pause Click
	var pauseClk = Crafty.e('PIcon').at(0, 0).bind('Click', function() {
		var first_entity = Crafty("Canvas").get(0);
		player.playerPause(first_entity);
	});

	sceneSet(currentSceneList);
	player.at(checkPoint[0], checkPoint[1]);
	console.log('Player Start point is: ' + checkPoint[0] + ',' + checkPoint[1]);
});