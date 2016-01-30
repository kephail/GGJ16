class Preload extends Phaser.State {
  preload() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);


    this.load.tilemap('board', 'assets/tilemaps/board.json', null, Phaser.Tilemap.TILED_JSON);

    this.load.image('tiles', 'assets/images/tiles.png');

    //load player images
    this.load.image('player01', 'assets/images/player01.png');
    this.load.image('player02', 'assets/images/player02.png');
    this.load.image('player03', 'assets/images/player03.png');
    this.load.image('player04', 'assets/images/player04.png');
  }

  create() {
      this.state.start('Main');
  }

}
export default Preload;
