import Player from '../objects/Player';

class Main extends Phaser.State {

	create() {
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

		console.log(this.rollDie(10));
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

}

export default Main;
