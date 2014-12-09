/**
 * Created by Kjelle on 04.12.2014.
 */
function Level(){
    this.platforms = null;
    this.geometry = null;
    this.enemies = null;

    this.createSky();
    this.createRain();
    this.createPlatforms();
    this.createEnemies();


}

Level.prototype.update = function () {
    if(this.enemies.countDead() > 0){
        var e = this.enemies.getFirstDead();
        if(game.rnd.between(0,1) === 1){
            e.reset(0,game.rnd.between(-20,game.world.height - 64 -48));
            e.moving = 'right';
        } else {
            e.reset(game.world.width,game.rnd.between(-20,game.world.height - 64 -48));
            e.moving = 'left';
        }
    }

};

Level.prototype.createEnemies = function () {
    this.enemies = game.add.group();
    for(var i = 0; i<1; i++){
        this.enemies.add(new Soldier({x: game.rnd.between(0,1300), y: 200}));
    }

};

Level.prototype.createSky = function () {
    var sky = game.add.sprite(0, 0, 'sky');
    var scaleY = game.world.height / sky.height;
    var scaleX = game.world.width / sky.width;
    sky.scale.setTo(scaleX, scaleY);
};

Level.prototype.createRain = function () {
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

Level.prototype.createPlatforms = function () {
    this.platforms = game.add.group();
    this.platforms.enableBody = true;

    this.geometry = game.add.group();
    this.geometry.enableBody = true;

    var ground = this.geometry.create(-40, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    var scaleX = (game.world.width +40) / ground.width;
    ground.scale.setTo(scaleX, 2);
    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = this.platforms.create(game.world.width - 100, game.world.height - 200, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(1, 0.5);

    ledge = this.platforms.create(game.world.width - 200, game.world.height - 400, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(1, 0.5);

    ledge = this.platforms.create(-300, game.world.height - 200, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(1, 0.5);

    ledge = this.platforms.create(-200, game.world.height - 400, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(1, 0.5);
};