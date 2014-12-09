var game = new Phaser.Game(1334, 750, Phaser.AUTO, 'game');
window.onload = function () {
    game.state.add('Boot', Ludum.Boot);
    game.state.add('Preloader', Ludum.Preloader);
    game.state.add('MainMenu', Ludum.MainMenu);
    game.state.add('Game', Ludum.Game);
    game.state.start('Boot');
};

var shakeWorld = 0;
var shakeWorldMax = 20;
var shakeWorldTime = 0;
var shakeWorldTimeMax = 40;

function checkForCameraShake() {
    // on update
    if (shakeWorldTime > 0) {
        var magnitude = ( shakeWorldTime / shakeWorldTimeMax ) * shakeWorldMax;
        var rand1 = game.rnd.integerInRange(-magnitude,magnitude);
        var rand2 = game.rnd.integerInRange(-magnitude,magnitude);
        game.world.setBounds(rand1, rand2, game.width + rand1, game.height + rand2);
        shakeWorldTime--;
        if (shakeWorldTime === 0) {
            game.world.setBounds(0, 0, game.width,game.height); // normalize after shake?
        }
    }
}

function cameraShake(amount){
    shakeWorldTime = amount;
}