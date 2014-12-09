function Actor(location, spriteName) {
    Phaser.Sprite.call(this, game, location.x, location.y, spriteName);

    this.moveSpeed = 15;
    this.jumpTimer = 0;
    this.jumpDuration = 0.3;
    this.jumpSpeed = 30;
    this.doubleJumped = false;
    this.airborne = false;
    this.bounce = 0.2;
    this.gravity = 1600;


    game.physics.arcade.enable(this);

    //  Player physics properties.
    this.body.drag.x = 100;
    this.body.bounce.y = 0.2;
    this.body.gravity.y = this.gravity;
    this.body.collideWorldBounds = true;

    game.add.existing(this);

    this.bloodEmitter = game.add.emitter(0, 0, 100);
    this.bloodEmitter.setScale(1,5,1,5);
    this.bloodEmitter.gravity = this.gravity;
    this.bloodEmitter.makeParticles('blood', [0,1,2,3,4,5,6,7],500,true);


}

Actor.prototype = Object.create(Phaser.Sprite.prototype);
Actor.prototype.constructor = Actor;

Actor.prototype.moveLeft = function(){
    this.body.velocity.x = -this.moveSpeed * game.time.physicsElapsedMS;
    this.animations.play('left');
};

Actor.prototype.moveRight = function() {
    this.body.velocity.x = this.moveSpeed * game.time.physicsElapsedMS;
    this.animations.play('right');
};

Actor.prototype.jump = function(){
    if(this.jumpTimer < this.jumpDuration){
        this.body.velocity.y = -this.jumpSpeed * game.time.physicsElapsedMS;
        this.jumpTimer += game.time.physicsElapsed;
    }
};