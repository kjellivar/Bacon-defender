/**
 * Created by Kjelle on 08.12.2014.
 */
var Ludum = {};
Ludum.Boot = function(game){};

Ludum.Boot.prototype.preload = function () {
    this.load.image('ground', 'assets/platform.png');
};

Ludum.Boot.prototype.create = function () {
    this.game.state.start('Preloader');
};