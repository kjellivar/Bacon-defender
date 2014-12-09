Ludum.Game = function (game) {
    player = null;
    level = null;
    this.debugtext = null;
    bacon = null;
};

Ludum.Game.prototype.create = function create() {

    game.time.slowMotion = 1;
    //menuMusic.fadeOut(4000);
    game.physics.startSystem(Phaser.Physics.ARCADE);

    level = new Level();
    player = new Player({x: 240, y: 450});
    bacon = game.add.sprite(game.world.centerX, game.world.height - 64 -40, 'bacon');

    scoreText = game.add.text(20, 20, 'Score: 0',
        { font: "20px Arial", fill: "#ffffff", align: "left" });
    scoreText.setShadow(0, 2,'rgba(128,128,128,1)');

    mxText = game.add.text(20, 40, 'Multiplier: 1',
        { font: "20px Arial", fill: "#ffffff", align: "left" });
    mxText.setShadow(0, 2,'rgba(128,128,128,1)');

    game.physics.arcade.enable(bacon);
    bacon.body.immovable = true;


};

Ludum.Game.prototype.update = function update() {
    //Static non-passable geometry collision
    game.physics.arcade.collide(player, level.geometry);
    game.physics.arcade.collide(level.enemies, level.geometry);
    game.physics.arcade.collide(player.bloodEmitter, level.geometry, function (particle, geo) {
        particle.body.velocity.x = 0;
    });

    //Passable platform collision
    game.physics.arcade.collide(player, level.platforms, null, player.platformCollision, player);
    game.physics.arcade.collide(level.enemies, level.platforms);
    game.physics.arcade.collide(player, bacon);
    game.physics.arcade.overlap(level.enemies, bacon, function(bakon,enemy){
        if(!enemy.dying){
            bakon.kill();
            enemy.hasBacon = true;
            enemy.tint = 0xFF0000;
        }
    });

    //Player and enemy collision
    game.physics.arcade.overlap(level.enemies, player.bullets, player.hitEnemy, null, player);
    game.physics.arcade.overlap(level.enemies, player, player.takeDamage, null, player);

    level.update();

    checkForCameraShake();


};

