/**
 * Player object
 */

function Player (location) {
    Actor.call(this,location, 'dude');

    this.fallThrough = false;
    this.bullets = game.add.group();
    this.fireRate = 100;
    this.nextFire = 0;

    this.score = 0;
    this.multiplier = 0;

    this.gameOverText = game.add.text(game.world.centerX, 150, 'GAME OVER',
        { font: "96px Arial", fill: "#ffffff", align: "center" });
    this.gameOverText.anchor.setTo(0.5, 0.5);
    this.gameOverText.setShadow(0, 5,'rgba(128,128,128,1)');

    this.clickText = game.add.text(game.world.centerX, 300, '- click to restart -',
        { font: "40px Arial", fill: "#ffffff", align: "center" });
    this.clickText.anchor.setTo(0.5, 0.5);

    this.gameOverText.visible = false;
    this.clickText.visible = false;

    this.events.onKilled.add(this.die, this);


    this.body.checkCollision.up = false;
    this.body.setSize(20,32,10,16);

    this.flashEmitter = game.add.emitter(0, 0, 1);
    this.flashEmitter.setScale(1, 2, 1, 2);
    this.flashEmitter.gravity = 0;
    this.flashEmitter.setXSpeed(0,0);
    this.flashEmitter.setYSpeed(0,0);
    this.flashEmitter.makeParticles('flash');

    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(50, 'bullet');
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('body.mass', 0.1);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.callAll('body.setSize','body',4,2,0,-3);
    this.bullets.callAll('animations.add', 'animations', 'fire', [0, 1, 2, 3], 60);

    game.camera.follow(this.sprite, Phaser.Camera.FOLLOW_PLATFORMER);


    //  Our two animations, walking left and right.
    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);

    //controls
    this.controls = {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D)
    };

    this.controls.up.onUp.add(function(){

        if(this.airborne){
            this.doubleJumped = true;
        }
        this.airborne = true;
        this.jumpTimer = 0;
    }, this)



}
Player.prototype = Object.create(Actor.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {

    //  Reset the players velocity (movement)
    this.body.velocity.x = 0;

    // Horizontal movement
    if (this.controls.left.isDown) {
        this.moveLeft();
    } else if (this.controls.right.isDown) {
        this.moveRight();
    } else {
        this.animations.stop();
        this.frame = 4;
    }

    //Vertical movement
    if(this.controls.up.isDown){
        if(!this.airborne || !this.doubleJumped){
            this.jump();
        }
    }

    if(this.body.touching.down){
        this.airborne = false;
        this.doubleJumped = false;
        if(this.controls.down.isDown){
            this.fallThroughFloor();
        }
    }

    if (game.input.activePointer.isDown)
    {
        this.fire();
    }

    if(!this.multiplierRecentlyIncreased && this.alive){
        this.multiplier++;
        this.multiplierRecentlyIncreased = true;
        mxText.text = 'Multiplier: ' + this.multiplier +'x';
        game.time.events.add(Phaser.Timer.SECOND * 5, function(){
            this.multiplierRecentlyIncreased = false;

            var ninja = new Soldier({x: -20, y: -20});
            ninja.kill();
            level.enemies.add(ninja);

        }, this);
    }

};



Player.prototype.fallThroughFloor = function(){
    this.fallThrough = true;
    game.time.events.add(Phaser.Timer.QUARTER, function(){
        this.fallThrough = false;
    }, this);
};

Player.prototype.fire = function () {

    if (this.alive && game.time.now > this.nextFire && this.bullets.countDead() > 0)
    {
        this.nextFire = game.time.now + this.fireRate;

        var bullet = this.bullets.getFirstDead();

        if(this.body.velocity.x > 0){
            bullet.reset(this.x + 28, this.y + 24);
        } else if(this.body.velocity.x === 0) {
            bullet.reset(this.x + 16, this.y + 24);
        } else {
            bullet.reset(this.x, this.y + 24);
        }
        this.flashEmitter.x = bullet.x;
        this.flashEmitter.y = bullet.y;
        this.flashEmitter.start(true, 20, null, 1);


        game.physics.arcade.moveToPointer(bullet, 800);
        bullet.rotation = game.physics.arcade.angleToPointer(bullet);
        bullet.animations.play('fire');
    }

};

Player.prototype.hitEnemy = function (enemy,bullet) {
    enemy.body.velocity.x = game.rnd.between((bullet.body.velocity.x < 0 ? -100:100),(bullet.body.velocity.x < 0 ? -600:600));
    enemy.body.velocity.y = game.rnd.between(0,-800);
    enemy.body.angularVelocity = game.rnd.between(-200,200);

    if(!enemy.dying){
        enemy.dying = true;
        this.score = this.score + 100 * this.multiplier;
        scoreText.text = 'Score: ' + this.score;
        game.time.events.add(Phaser.Timer.SECOND, function(){

            enemy.dying = false;
            enemy.angle = 0;
            if(enemy.hasBacon){
                enemy.resetBacon();
            }
            enemy.kill();
        }, this);
        bullet.kill();
    }
    this.bloodEmitter.x = bullet.x;
    this.bloodEmitter.y = bullet.y;
    this.bloodEmitter.setXSpeed((bullet.body.velocity.x < 0 ? -50:50), (bullet.body.velocity.x > 0 ? -200:200));
    this.bloodEmitter.setYSpeed(100, -300);
    this.bloodEmitter.start(true, 2000, null, 20);
};

Player.prototype.takeDamage = function (b,enemy) {
    if(!enemy.dying && !this.recentlyDamaged){
        this.body.velocity.x = game.rnd.between(-200, 200);
        this.body.velocity.y = game.rnd.between(-200, -400);
        cameraShake(20);
        this.damage(0.25);
        this.recentlyDamaged = true;
        this.multiplier = 1;
        mxText.text = 'Multiplier: ' + this.multiplier +'x';
        game.time.events.add(Phaser.Timer.SECOND, function(){
            this.recentlyDamaged = false;
        }, this);
    }

};

Player.prototype.platformCollision = function(player,platform){
    return !this.fallThrough;
};

Player.prototype.die = function () {
    this.gameOverText.visible = true;
    this.clickText.visible = true;
    game.input.onDown.add(function(){
        game.state.start('Game');
    }, this);
};
