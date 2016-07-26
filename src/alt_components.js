// The Grid component allows an element to be located
// on a grid of tiles
//var speed = 0;
var keys = ({});

Crafty.c('Basics', {
	init: function() {
	},
	
	at: function(x, y) {
		if (debug == true) this.addComponent('WiredHitBox');
		this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height});
		return this;
    },
	
	message: function(x, y, w, z, words, tC, tO) {
		if (typeof x != 'number') x = (Game.Res.width/4)/8, words = x;
		if (typeof y != 'number') y = Game.Res.height/2, words = y;
		if (typeof w != 'number') w = Game.Res.width/4, words = w;
		if (typeof z != 'number') z = 3, words = z;
		if (typeof words != 'string') words = 'TESTING';
		if (typeof tC != 'string') tC = '#FF0000';
		if (typeof tO != 'number') tO = 7000;
		Crafty.e("2D, DOM, Text").attr({ x: x, y: y, w: w, z: z}).text(words)
			.textColor(tC)
			.textFont({ type: 'italic', family: 'Arial' })
			.textFont({ size: '15px', weight: 'bold' })
			.timeout(function() {
				this.destroy();
			}, tO);
	}
});

Crafty.c('TinyGround', {
	init: function() {
		this.requires('Basics, Floor, 2D, Canvas');
		this.attr({x: 0, y: 250, w: 25, h: 5});
		this.origin(12.5, 2.5);
		this.ID = 'ground';
	}
});


/* //ISSUE WITH TRIGGERING PAUSE WHILE BUTTON DOWN CAUSES FAILURE
Crafty.c('Button', {
	init: function() {
		this.requires('Basics, 2D, Canvas, Color, Mouse, Touch')      
			.attr({x: 200, y: 300, w: 35, h: 35, z:11})
			.bind('TouchStart', function(TouchPoint){
				if (this.type == 0) {
					console.log('up tapped');
					key = {key: Crafty.keys['UP_ARROW']};
				} else if (this.type == 1) {
					console.log('down tapped');
					key = {key: Crafty.keys['DOWN_ARROW']};
				} else if (this.type == 2) {
					console.log('left tapped');
					key = {key: Crafty.keys['LEFT_ARROW']};
				} else if (this.type == 3) {
					console.log('right tapped');
					key = {key: Crafty.keys['RIGHT_ARROW']};
				} else if (this.type == 4) {
					console.log('pause tapped');
					key = {key: Crafty.keys['Q']};
				}
				Crafty.trigger("KeyDown", key);
			})
			.bind('TouchEnd', function() {
				if (this.type == 0) {
					console.log('up released');
					key = {key: Crafty.keys['UP_ARROW']};
				} else if (this.type == 1) {
					console.log('down released');
					key = {key: Crafty.keys['DOWN_ARROW']};
				} else if (this.type == 2) {
					console.log('left released');
					key = {key: Crafty.keys['LEFT_ARROW']};
				} else if (this.type == 3) {
					console.log('right released');
					key = {key: Crafty.keys['RIGHT_ARROW']};
				} else if (this.type == 4) {
					console.log('pause released');
					key = {key: Crafty.keys['Q']};
				}
				Crafty.trigger("KeyUp", key);
			})
			.color('blue');
			this.type = 0;
	},
	
	set: function(x) {
		this.type = x;
		return this;
    },
}); */

Crafty.c('Guy', {
	init: function() {
		player = this; 
		//speed = 500;
		gravitySet = 500;
		jumperSet = 175;
		antiGrav = false;
		playerColor = 'yellow';
		//keys = {UP_ARROW: -90, RIGHT_ARROW: 0, LEFT_ARROW: 180};
		//alt_keys = 1;
		this.requires('Basics, Player, 2D, Canvas, Color, Twoway, Jumper, Gravity, Collision')
			.attr({x: 100, y: 100, w: 20, h: 50, z: 3})
			.color(playerColor)
			.twoway()
			.jumper(jumperSet, [Crafty.keys.UP_ARROW])
			//.multiway(speed, keys)
/* 			.bind('EnterFrame', function() {
				if(controls() == 0) {
					if(this.isDown(Crafty.keys.LEFT_ARROW) || left()) {
					  this.x = this.x-3;
					} else if (this.isDown(Crafty.keys.RIGHT_ARROW) || right()) {
					  this.x = this.x+3;
					} else if (this.isDown(Crafty.keys.DOWN_ARROW) || down()) {
					  this.y = this.y+3;
					}
				} else if(controls() == 1){
					if(this.isDown(Crafty.keys.LEFT_ARROW) || left()) {
					  this.x = this.x-3;
					} else if (this.isDown(Crafty.keys.RIGHT_ARROW) || right()) {
					  this.x = this.x+3;
					} else if (this.isDown(Crafty.keys.UP_ARROW) || up()) {
					  this.y = this.y-3;
					}
				} else if(controls() == 2) {
				}
			}) */
			.gravity('Floor')
			.origin(10, 25)
			.gravityConst(gravitySet)
			.upsideDown(antiGrav)
			.onHit('RockTB', function(object) {
				entity = object[0].obj;
				if (this.y > entity.y) {
					//alert("Hit the Bottom " + entity.y);
					this.y = entity.y + entity.h;
				} else if (this.y < entity.y) {
					//alert("Hit the Top " + entity.y);
					this.y = entity.y - this.h;
				}
            })
			.onHit('RockLR', function(object) {
				entity = object[0].obj;
				if (this.x > entity.x) {
					//alert("Hit the Left " + entity.x);
					this.x = entity.x + entity.w;
				} else if (this.x < entity.x) {
					//alert("Hit the Right " + entity.x);
					this.x = entity.x - this.w;
				}
            })
			.onHit('Door', function(object) {
				entity = object[0].obj;
				if (this.x > entity.x) {
					this.x = entity.x + entity.w;
				} else if (this.x < entity.x) {
					this.x = entity.x - this.w;
				}
				//Color RED  BLUE GREEN ORANGE BLACK INDIGO VIOLET WHITE YELLOW
				if (entity.type === 'red') {
					if (Keys[0] > 0) {
						Game.playerKeys(0, 'm');
						entity.destroy();
						Game.kill(entity);
					}
				} else if (entity.type === 'blue') {
					if (Keys[1] > 0) {
						Game.playerKeys(1, 'm');
						entity.destroy();
						Game.kill(entity);
					}
				} else if (entity.type === 'green') {
					if (Keys[2] > 0) {
						Game.playerKeys(2, 'm');
						entity.destroy();
						Game.kill(entity);
					}
				} else if (entity.type === 'orange') {
					if (Keys[3] > 0) {
						Game.playerKeys(3, 'm');
						entity.destroy();
						Game.kill(entity);
					}
				} else if (entity.type === 'black') {
					if (Keys[4] > 0) {
						Game.playerKeys(4, 'm');
						entity.destroy();
						Game.kill(entity);
					}
				} else if (entity.type === 'indigo') {
					if (Keys[5] > 0) {
						Game.playerKeys(5, 'm');
						entity.destroy();
						Game.kill(entity);
					}
				} else if (entity.type === 'violet') {
					if (Keys[6] > 0) {
						Game.playerKeys(6, 'm');
						entity.destroy();
						Game.kill(entity);
					}
				} else if (entity.type === 'white') {
					if (Keys[7] > 0) {
						Game.playerKeys(7, 'm');
						entity.destroy();
						Game.kill(entity);
					}
				} else if (entity.type === 'yellow') {
					if (Keys[8] > 0) {
						Game.playerKeys(8, 'm');
						entity.destroy();
						Game.kill(entity);
					}
				}
			})
			.onHit('End', function(object) {
				entity = object[0].obj;
				rise = true;
				//numbers = entity.type.split(',');
				//ex = parseInt(numbers[0]), wy = parseInt(numbers[1]);
				//checkPoint[0] = ex, checkPoint[1] = wy;
				//console.log(checkPoint[0] + ',' + checkPoint[1]);
				//this.x = 0, this.y = 0;
				this.destroy();
			})
			.onHit('RockCover', this.colliderRC)
			.onHit('ColorCover', this.colorCollider);
	},
	
	playerPause: function(first_entity) {
		if (clicked == false) {
			clicked = true;
			holder = jumperSet;
			player.removeComponent('Twoway');
			player.removeComponent('Jumper');
			//player.multiway({});
			//alt_keys = 2;
			//BG
			Crafty.e('Menu').at((first_entity.x/(Game.map_grid.tile.width) + 1), (3)).bind('KeyDown', function(e){
				if (e.key == Crafty.keys.O) {
					player.color('orange'); playerColor = 'orange';
				} else if (e.key == Crafty.keys.Y) {
					player.color('yellow'); playerColor = 'yellow';
				} else if (e.key == Crafty.keys.G) {
					player.color('green'); playerColor = 'green';
				} else if (e.key == Crafty.keys.B) {
					player.color('blue'); playerColor = 'blue';
				} else if (e.key == Crafty.keys.I) {
					player.color('indigo'); playerColor = 'indigo';
				} else if (e.key == Crafty.keys.V) {
					player.color('violet'); playerColor = 'violet';
				} else if (e.key == Crafty.keys.R) {
					player.color('red'); playerColor = 'red';
				} else if (e.key == Crafty.keys.L) {
					player.color('black'); playerColor = 'black';
				} else if (e.key == Crafty.keys.W) {
					player.color('white'); playerColor = 'white';
				} else if (e.key == Crafty.keys.ESC) {
					fresh = true;
					Game.playerLives(-1);
					player.x = 0;
					player.y =0;
					Crafty.scene('Onward', RedoLevelText());
				} 

			});
			//RIGHT
			Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 2, (4)).color('orange').bind('Click', function(){player.color(this.color()); playerColor = 'orange';}).bind('TouchStart', function(){player.color(this.color()); playerColor = 'orange';});
			Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 2, (6)).color('yellow').bind('Click', function(){player.color(this.color()); playerColor = 'yellow';}).bind('TouchStart', function(){player.color(this.color()); playerColor = 'yellow';});
			Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 2, (8)).color('green').bind('Click', function(){player.color(this.color()); playerColor = 'green';}).bind('TouchStart', function(){player.color(this.color()); playerColor = 'green';});
			//MIDDLE
			Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 4, (4)).color('blue').bind('Click', function(){player.color(this.color()); playerColor = 'blue';}).bind('TouchStart', function(){player.color(this.color()); playerColor = 'blue';});
			Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 4, (6)).color('indigo').bind('Click', function(){player.color(this.color()); playerColor = 'indigo';}).bind('TouchStart', function(){player.color(this.color()); playerColor = 'indigo';});
			Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 4, (8)).color('violet').bind('Click', function(){player.color(this.color());  playerColor = 'violet';}).bind('TouchStart', function(){player.color(this.color());  playerColor = 'violet';});
			//LEFT
			Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 6, (4)).color('red').bind('Click', function(){player.color(this.color()); playerColor = 'red';}).bind('TouchStart', function(){player.color(this.color()); playerColor = 'red';});
			Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 6, (6)).color('black').bind('Click', function(){player.color(this.color()); playerColor = 'black';}).bind('TouchStart', function(){player.color(this.color()); playerColor = 'black';});
			Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 6, (8)).color('white').bind('Click', function(){player.color(this.color());  playerColor = 'white';}).bind('TouchStart', function(){player.color(this.color());  playerColor = 'white';});
			//Buttons
			Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 3, (10)).color('white').bind('Click', function(){player.color(this.color());  playerColor = 'white';}).bind('TouchStart', function(){player.color(this.color());  playerColor = 'white';});
			Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 3, (10)).color('white').bind('Click', function(){fresh = true; Game.playerLives(-1); player.x = 0; player.y = 0; Crafty.scene('Onward', RedoLevelText());}).bind('TouchStart', function(){fresh = true; Game.playerLives(-1); player.x = 0; player.y = 0; Crafty.scene('Onward', RedoLevelText());});
			Crafty.e("2D, DOM, Text").attr({x: (first_entity.x + 77), y: 203, w: 90, z: 10}).text('Redo')
				.textColor('#FF0000')
				.textFont({ type: 'italic', family: 'Arial' })
				.textFont({ size: '13px', weight: 'bold' });
		} else if (clicked == true) {
			clicked = false;
			Crafty("Menu").destroy();
			Crafty("Text").destroy();
			//alt_keys = holder;
			//player.multiway(speed, keys);
			player.addComponent('Twoway');
			player.addComponent('Jumper');
			player.jumper(holder, [Crafty.keys.UP_ARROW])
			player.twoway();
		}
	},
	
	playerNormalize: function() {
		//keys = {UP_ARROW: -90, RIGHT_ARROW: 0, LEFT_ARROW: 180};
		//speed = 300;
		gravitySet = 500;
		antiGrav = false;
		playerColor = 'yellow';
		jumperSet = 175;
		this.attr({w: 20, h: 50});
		this.Rotation == 0;
		this.color(playerColor);
		this.upsideDown(antiGrav);
		//alt_keys = 1;
		//this.multiway(speed, keys);
		this.twoway();
		this.jumper(jumperSet, [Crafty.keys.UP_ARROW]);
		this.gravityConst(gravitySet);
	},
	
	playerRotate: function() {
		playerColor = ('red');
		this.color('red');
		this.rotation == 90;
		this.attr({w: 50, h: 20});
	},
	
	playerUpright: function() {
		playerColor = ('orange');
		this.color('orange');
		this.rotation == 180;
		this.attr({w: 20, h: 50});
	},
	
	playerAntiGrav: function(block) {
		gravitySet = -500;
		antiGrav = true;
		jumperSet = jumperSet * -1;
		//keys = {DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180};
		this.gravityConst(gravitySet);
		this.upsideDown(true);
		//alt_keys = 0;
		//this.multiway(speed, keys);
		this.jumper(jumperSet, [Crafty.keys.DOWN_ARROW]);
		Game.kill(block);
	},
	
	playerReGrav: function(block) {
		//keys = {UP_ARROW: -90, RIGHT_ARROW: 0, LEFT_ARROW: 180};
		gravitySet = 500;
		antiGrav = false;
		jumperSet = jumperSet * -1;
		this.gravityConst(gravitySet);
		this.upsideDown(false);
		//alt_keys = 1;
		//this.multiway(speed, keys);
		this.twoway();
		console.log(jumperSet);
		this.jumper(jumperSet, [Crafty.keys.UP_ARROW]);
		Game.kill(block);
	},
	
	playerSuper: function(block) {
		//this.gravityConst(375);
		//speed = 300;
		jumperSet = 250;
		this.jumper(jumperSet, [Crafty.keys.UP_ARROW]);
		Game.kill(block);
	},
	
	colorCollider: function(object) {
		//alert('ColorZone');
		entity = object[0].obj;
		if (entity.name == 'ColorZone') {
			if (playerColor != entity.type) {
				console.log('Player Death. playerColor was:' + playerColor + 'Entity type was:' + entity.type);
				this.x = 0, this.y = 0;
				Game.playerStats(true, false);			
			}
		} else if (entity.name == 'AntiColorZone') {
			if (playerColor != entity.type) {
				console.log('Player Death. playerColor was:' + playerColor + 'Entity type was:' + entity.type);
				this.x = 0, this.y = 0;
				Game.playerStats(true, false);				
			}
		} else if (entity.name == 'WallChange') {
			this.color(entity.color());
			colors = entity.type.split(',');
			from = colors[0], to = colors[1];
			if (this.x > entity.x + 18) {
				playerColor = to;
				this.color(to);
				console.log(playerColor + ' ' + entity.x);
			} else if (this.x < (entity.x + 16)) {
				playerColor = from;
				this.color(from);
				console.log(playerColor + ' ' + entity.x);
			}
		}
	},
	
	colliderRC: function(object) {
		entity = object[0].obj;
		if (entity.name === 'Pit') {
			this.x = 0, this.y = 0;
			Game.playerStats(true, false);	
		} else if (entity.name === 'Key') {
			//Color RED  BLUE GREEN ORANGE BLACK INDIGO VIOLET WHITE YELLOW
			if (entity.type === 'red') {
				Game.playerKeys(0, 'p');
				entity.destroy();
			} else if (entity.type === 'blue') {
				Game.playerKeys(1, 'p');
				entity.destroy();
			} else if (entity.type === 'green') {
				Game.playerKeys(2, 'p');
				entity.destroy();
			} else if (entity.type === 'orange') {
				Game.playerKeys(3, 'p');
				entity.destroy();
			} else if (entity.type === 'black') {
				Game.playerKeys(4, 'p');
				entity.destroy();
			} else if (entity.type === 'indigo') {
				Game.playerKeys(5, 'p');
				entity.destroy();
			} else if (entity.type === 'violet') {
				Game.playerKeys(6, 'p');
				entity.destroy();
			} else if (entity.type === 'white') {
				Game.playerKeys(7, 'p');
				entity.destroy();
			} else if (entity.type === 'yellow') {
				Game.playerKeys(8, 'p');
				entity.destroy();
			}
			Game.kill(entity);
		} else if (entity.name == 'Unlock') {
			if (entity.type == 'Left') {
				Crafty.trigger('Left' + LeftDoor);
				LeftDoor++;
			} else if (entity.type == 'Right') {
				Crafty.trigger('Right' + RightDoor);
				RightDoor++;
			} else if (entity.type == 'Trap') {
				entity.rotation = 90;
				Crafty.trigger('Trap' + TrapDoor);
				TrapDoor++;
			}
			entity.destroy();
			Game.kill(entity);
		} else if (entity.name == 'ColorChange0') {
			playerColor = (entity.type);
			this.color(entity.type);
			entity.destroy();
			Game.kill(entity);
		} else if (entity.name == 'ColorChange1') {
			playerColor = (entity.type);
			this.color(entity.type);
			Game.kill(entity);
		} else if (entity.name == 'null') {
			entity.destroy();
			Game.kill(entity);
		} else if (entity.name == 'Coin') {
			Game.playerScore(100);
			entity.destroy();
			Game.kill(entity);
		} else if (entity.name == 'CheckPoint') {
			numbers = entity.type.split(',');
			ex = parseInt(numbers[0]), wy = parseInt(numbers[1]);
			checkPoint[0] = ex, checkPoint[1] = wy;
			console.log('Checkpoint set to: ' + checkPoint[0] + ',' + checkPoint[1]);
			entity.destroy();
			Game.kill(entity);
		} else if (entity.name == 'SuperJump') {
			player.playerSuper(entity);
			entity.destroy();
		} else if (entity.name == 'PopUp') {
			Crafty.trigger('Pop' + PopUp);
			PopUp++;
			entity.destroy();
			Game.kill(entity);
		} else if (entity.name == 'Message') {
			Crafty.trigger('Note' + NoteNumber);
			NoteNumber++;
			entity.destroy();
			Game.kill(entity);
		} else if (entity.name == 'Portal') {
			numbers = entity.type.split(',');
			ex = parseInt(numbers[0]), wy = parseInt(numbers[1]);
			console.log(ex +"," + wy);
			playX = ex * Game.map_grid.tile.width; playY = wy * Game.map_grid.tile.height;
			console.log(playX +"," + playY);
			this.x = playX, this.y = playY;
			//entity.destroy();
		} else if (entity.name == 'Rotate') {
			this.playerRotate();
			entity.destroy();
			Game.kill(entity);
		} else if (entity.name == 'AntiGravity') {
			this.playerAntiGrav(entity);
			entity.destroy();
		} else if (entity.name == 'ReGravity') {
			this.playerReGrav(entity);
			entity.destroy();
		}
		//for disappearing level add entity.destroy(); to onhit('RockCover')
	}
});

Crafty.c('RockTB', {
	init: function() {		
		this.requires('Basics, 2D, Canvas, Collision');      
		this.attr({x: 200, y: 100, w: 25, h: 15});
		this.origin(12.5, 7.5);
	}
});

Crafty.c('RockLR', {
	init: function() {		
		this.requires('Basics, 2D, Canvas, Collision');      
		this.attr({x: 200, y: 100, w: 35, h: 10});
	}
});

Crafty.c('RockCover', {
	init: function() {		
		this.requires('Basics, 2D, Canvas, Color, Collision');      
		this.attr({x: 200, y: 100, w: 35, h: 20, z:2})
			.color('yellow');
	}
});

Crafty.c('ColorCover', {
	init: function() {		
		this.requires('Basics, 2D, Canvas, Color, Collision');      
		this.attr({x: 200, y: 100, w: 35, h: 20, z:2})
			.color('yellow');
	}
});

Crafty.c('Elevator', {
	init: function() {		
		this.requires('Basics, 2D, DOM, Color, Collision, End');
		this.bind('EnterFrame', this.raise);
		this.attr({x: 200, y: 100, w: 70, h: 80, z:2})
			.color('black')
			.onHit('RockCover', this.colliderRC);
	},
	
	
	raise: function(eventData) {
		if (rise) {
			if (this.y > -1000) this.y = this.y - 80 * (eventData.dt / 1000);
		}
	},
	
	colliderRC: function(object) {
		entity = object[0].obj;
		if (entity.name === 'Pit') {
			endPoint = parseInt(entity.type);
			if (this.y < endPoint) {
				rise = false;
				if (startPoint >= totalLevels) {
					startPoint = 1;
					Crafty.viewport.scroll('_x', 0);
					Crafty.viewport.scroll('_y', 0);
					Game.playerStats(false, true);	
				} else {
					startPoint++;
					Crafty.viewport.scroll('_x', 0);
					Crafty.viewport.scroll('_y', 0);
					Game.playerStats(false, false);
				}
				this.destroy();
			}
		}
	}
});

//Walk-Through Wall
Crafty.c('Wall', {
	init: function() {
		this.requires('Basics, 2D, Canvas, Color, Collision, ColorCover');
		this.attr({x: 0, y: 0, w: 35, h: 100, z: 10})
			.color('yellow');
	}
});

//Door to Unlock
Crafty.c('Door', {
  init: function() {
	  this.requires('Basics, 2D, Canvas, Color, Collision');
      this.attr({x: 0, y: 0, w: 35, h: 60, z: 2})
		  .color('yellow');
  }
});

//Costume/Pause Menu
Crafty.c('Menu', {
	init: function() {
		this.requires('Basics, 2D, DOM, Color, Menu');
		this.attr({x: 0, y: 0, w: 245, h: 180, z: 1})
			.color('steelblue');
	}
});

//Click-able Box/Costume
Crafty.c('Icon', {
	init: function() {		
		this.requires('Basics, 2D, Canvas, Menu, Mouse, Touch');      
		this.attr({x: 200, y: 100, w: 35, h: 20, z:10});
	}
});

//Holder for Pause
Crafty.c('Blank', {
	init: function() {		
		this.requires('Basics, 2D, Canvas, Keyboard, Mouse, Touch');      
		this.attr({x: 200, y: 100, w: 35, h: 20, z:10});
	}
});

//Click-able Pause
Crafty.c('PIcon', {
	init: function() {		
		this.requires('Basics, 2D, Canvas, Mouse, Touch');      
		this.attr({x: 200, y: 100, w: 1600, h: 400, z:10});
	}
});

//Click-able Pause
Crafty.c('PIcon2', {
	init: function() {		
		this.requires('Basics, 2D, Canvas, Mouse, Touch, Color');      
		this.attr({x: 200, y: 100, w: 1600, h: 30, z:10});
	}
});

//Click-able Button
Crafty.c('BIcon', {
	init: function() {		
		this.requires('Basics, 2D, Canvas, Color, Mouse');      
		this.attr({x: 200, y: 100, w: 35, h: 35, z:11})
			.color('blue');
	}
});

// Platform component - for handling moving Platform on screen
//--Crafty.e('Platform').at(59, 21).attr({way: 'y', sign: 'lt', 
//dy: -3, adjust: 500, end: 100}); //Vert
//--Crafty.e('Platform').at(66, 20).attr({way: 'x', sign: 'lt',
// dx: -3, adjust: 160, end: 1056}); //Horz
Crafty.c('Platform', {
  init: function() {
	this.requires('2D, DOM, Basics, Color');
	this.bind("EnterFrame",this.handle);
	this.attr({w:48, h:16})
	    .color('cyan');
  },
  
  handle:function() {
    if (this.way == 'y') {
	  this.y += this.dy;
	    if (this.sign == 'gt') {
		  if (this.y > this.end) this.y -= this.adjust;
		} else if (this.sign == 'lt') {
	      if (this.y < this.end) this.y += this.adjust;
		}
	} else if (this.way == 'x') {
	  this.x += this.dx;
	    if (this.sign == 'gt') {
	      if (this.x > this.end) this.x -= this.adjust;
		} else if (this.sign == 'lt') {  
		  if (this.x < this.end) this.x += this.adjust;
		}
    }
  }
});