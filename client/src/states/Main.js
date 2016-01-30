import Player from '../objects/Player';

class Main extends Phaser.State {

	create() {
		this.input.mouse.capture = true;

		this.rolling = false;

		this.boardData = [
			[['right'],['right'],['right'],['right'],['down', 'right'],['right'],['right'],['right'],['right'],['down']],
			[['up'],[null],[null],[null],['down'],[null],[null],[null],[null],['down']],
			[['up'],[null],[null],[null],['down'],[null],[null],[null],[null],['down']],
			[['up', 'right'],['right'],['right'],['right'],['right'],['right'],['right'],['right'],['right'],['down']],
			[['up'],[null],[null],[null],[null],[null],['up'],[null],[null],['down']],
			[['up', 'right'],['right'],['right'],['right'],['down','right'],['right'],['up'],[null],[null],['down']],
			[['up'],[null],[null],[null],['down'],[null],[null],[null],[null],['down']],
			[['up'],['left'],['left'],['left'],['left'],['left'],['left'],['left'],['left'],['left']]
		];
		//console.log(this.boardData[0][4]);
		this.music = this.add.audio('bgMusic');
		this.music.play();
		this.music.loopFull(1);

		this.board = this.add.tilemap('board');
		this.board.addTilesetImage('tiles', 'tiles');
		this.baselayer = this.board.createLayer('boardLayer');

		this.numOfPlayers = 4;

		let playerStart = this.findObjectsByType('playerStart', this.board, 'objectLayer')[0];

		this.players = new Array();
		for (var i = 1; i < this.numOfPlayers + 1; i++) {
			this.players.push(new Player(this.game, playerStart.x, playerStart.y, 'player0' + i));
		}

		this.playerTurn = 1;

		console.log(this.rollDie(10));
		console.log(this.board.layers[0].data);
		this.lastInput = false;
	}

	rollDie(dn){
		return this.rnd.integerInRange(1, dn);
	};

	findObjectsByType(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        element.y -= map.tileHeight;
        result.push(element);
      }
    });
    return result;
  }

	update(){
		let x = this.players[this.playerTurn - 1].x / 128;
		let y = this.players[this.playerTurn - 1].y / 128;
		this.input.activePointer.leftButton.onDown.add(function(){
			if (this.rolling === false) {
				this.rolling = true;
				this.players[this.playerTurn - 1].moves = this.rollDie(6);
			}
		}, this);
		if (this.rolling === true) {
			if(this.boardData[y][x][0] === 'down' && this.boardData[y][x][1] === 'right'){
				let dir = this.rnd.integerInRange(0, 1);
				if (dir === 0) {
					this.players[this.playerTurn - 1].x += 128;
				} else {
					this.players[this.playerTurn - 1].y += 128;
				}
				this.players[this.playerTurn - 1].moves--;
			} else if(this.boardData[y][x][0] === 'up' && this.boardData[y][x][1] === 'right'){
				let dir = this.rnd.integerInRange(0, 1);
				if (dir === 0) {
					this.players[this.playerTurn - 1].x += 128;
				} else {
					this.players[this.playerTurn - 1].y -= 128;
				}
				this.players[this.playerTurn - 1].moves--;
			} else if(this.boardData[y][x][0] === 'right'){
				this.players[this.playerTurn - 1].x += 128;
				this.players[this.playerTurn - 1].moves--;
			} else if(this.boardData[y][x][0] === 'down'){
				this.players[this.playerTurn - 1].y += 128;
				this.players[this.playerTurn - 1].moves--;
			} else if(this.boardData[y][x][0] === 'left'){
				this.players[this.playerTurn - 1].x -= 128;
				this.players[this.playerTurn - 1].moves--;
			} else if(this.boardData[y][x][0] === 'up'){
				this.players[this.playerTurn - 1].y -= 128;
				this.players[this.playerTurn - 1].moves--;
			}
			if (this.players[this.playerTurn - 1].moves <= 0) {
				this.rolling = false;
				this.playerTurn++;
				if(this.playerTurn > 4)
					this.playerTurn = 1;
			}
		}
	}

}

export default Main;
