/**
 * Created by Kjelle on 06.12.2014.
 */

function Soldier(location){
    Actor.call(this,location, 'soldier');

    this.body.mass = 100;
    //this.body.setSize(20, 25, 6, 4);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;

    this.animations.add('left', [0, 1,2,3], 10, true);
    this.animations.add('right', [5, 6,7,8], 10, true);

    if(game.rnd.between(0,1) === 1){

        this.moving = 'right';
    } else {

        this.moving = 'left';
    }

}

Soldier.prototype = Object.create(Actor.prototype);
Soldier.prototype.constructor = Soldier;

Soldier.prototype.update = function(){
   //this.moveLeft();
    if(this.alive && !this.dying){
        if(this.moving === 'left'){
            this.moveLeft();
        } else if(this.moving === 'right') {
            this.moveRight();
        }

        if(this.body.blocked.left){
            this.moving = 'right';
            if(this.hasBacon){
                player.multiplier = 1;
                mxText.text = 'Multiplier: ' + player.multiplier +'x';
                this.resetBacon();
            }
        } else if(this.body.blocked.right){
            this.moving = 'left';
            if(this.hasBacon){
                player.multiplier = 1;
                mxText.text = 'Multiplier: ' + player.multiplier +'x';
                this.resetBacon();
            }
        }

        if(this.body.blocked.down){
            this.jump();
        }

        var dice = game.rnd.between(0,100);

        if(dice === 5){

            this.moving = 'right';
        } else if(dice === 32) {

            this.moving = 'left';
        } else if(dice === 73){
            this.jump();
        }
    }

};

Soldier.prototype.resetBacon = function(){

    bacon.reset(game.world.centerX, game.world.height - 64 -40);
    this.hasBacon = false;
    this.tint = 0xFFFFFF;

};

