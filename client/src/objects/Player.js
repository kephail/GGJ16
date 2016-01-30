class Player extends Phaser.Sprite {

  constructor(game, x, y, key) {
    super(game, x, y, key);
    game.add.existing(this);
  }

  update(){
  }

}

export default Player;
