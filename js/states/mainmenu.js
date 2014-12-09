/**
 * Created by Kjelle on 08.12.2014.
 */
Ludum.MainMenu = function (game) {
    menuMusic = null;
};

Ludum.MainMenu.prototype.create = function () {
    /*var sky = game.add.sprite(0, 0, 'sky');
    var scaleY = game.world.height / sky.height;
    var scaleX = game.world.width / sky.width;
    sky.scale.setTo(scaleX, scaleY);*/
    game.time.slowMotion = 2;

    this.createRain();
    this.makeRainStuff();

    menuMusic = game.add.audio('menuMusic',1,true);
    menuMusic.play();

    baconking = game.add.sprite(game.world.centerX, 350, 'baconking');
    baconking.anchor.setTo(0.5,0.5);

    var headerText = game.add.text(game.world.centerX, 150, 'BACON DEFENDER',
        { font: "96px Arial", fill: "#ffffff", align: "center" });
    headerText.anchor.setTo(0.5, 0.5);
    headerText.setShadow(0, 5,'rgba(128,128,128,1)');

    var clickText = game.add.text(game.world.centerX, 500, '- click to start -',
        { font: "40px Arial", fill: "#ffffff", align: "center" });
    clickText.anchor.setTo(0.5, 0.5);

    var sprite_tween = this.add.tween(clickText);
    sprite_tween.to({x: game.world.centerX, y: 520, tint:0xFFFF00},
        1000 /*duration of the tween (in ms)*/,
        Phaser.Easing.Sinusoidal.InOut /*easing type*/,
        true /*autostart?*/,
        100 /*delay*/,
        -1,
        true/*yoyo?*/);

    game.input.onDown.add(this.startGame, this);
};

Ludum.MainMenu.prototype.startGame = function () {
    game.state.start('Game');
};

Ludum.MainMenu.prototype.makeRainStuff = function () {
    var emitter = game.add.emitter(game.world.centerX+50, -300, 400);

    emitter.width = game.world.width;
    emitter.angle = 10; // uncomment to set an angle for the rain.

    emitter.makeParticles(['bacon','soldier']);

    emitter.minParticleScale = 0.2;
    emitter.maxParticleScale = 2;

    emitter.setYSpeed(1, 5);
    emitter.setXSpeed(-5, 5);

    emitter.minRotation = 0;
    emitter.maxRotation = 20;

    emitter.start(false, 16000, 300, 0);
};

Ludum.MainMenu.prototype.createRain = function () {
    var emitter = game.add.emitter(game.world.centerX+50, -200, 400);

    emitter.width = game.world.width;
    emitter.angle = 10; // uncomment to set an angle for the rain.

    emitter.makeParticles('rain');

    emitter.minParticleScale = 0.1;
    emitter.maxParticleScale = 0.3;

    emitter.setYSpeed(500, 800);
    emitter.setXSpeed(-5, 5);

    emitter.minRotation = 0;
    emitter.maxRotation = 0;

    emitter.start(false, 1600, 5, 0);
};

