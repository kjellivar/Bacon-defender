/**
 * Created by Kjelle on 08.12.2014.
 */
Ludum.Preloader = function (game) {
};

Ludum.Preloader.prototype.preload = function () {
    this.stage.backgroundColor = '#0d0e0f';
    var preloadBar = game.add.sprite((320 - 158) / 2, (480 - 50) / 2, 'ground');
    this.load.setPreloadSprite(preloadBar);
    game.add.text(game.world.centerX, 400, 'LOADING',
        { font: "60px Arial", fill: "#ffffff", align: "center" })
        .anchor.setTo(0.5, 0.5);


    //Level assets
    this.load.image('sky', 'assets/night_sky.png');
    this.load.image('bacon', 'assets/bacon.png');
    this.load.image('baconking', 'assets/baconking.png');

    //Enemy assets
    this.load.spritesheet('soldier', 'assets/ninja.png', 24, 48);

    //Player assets
    this.load.spritesheet('dude', 'assets/dude.png', 24, 48);
    this.load.spritesheet('bullet', 'assets/bullet.png', 16, 8);

    //particles
    this.load.spritesheet('blood', 'assets/blood.png', 1, 1);
    this.load.spritesheet('flash', 'assets/flash.png', 38, 38);
    this.load.spritesheet('rain', 'assets/rain.png', 17, 17);

    //UI
    this.load.spritesheet('startButton', 'assets/startbutton.png', 100, 50);

    //sound
    game.load.audio('menuMusic', 'assets/menu.mp3');
};

Ludum.Preloader.prototype.create = function () {
    this.game.state.start('MainMenu');
};