import Phaser from 'phaser';

import MainMenu from './scenes/MainMenu';

// To run server, "npm start"

const config = {
    width: 1280,
    height: 720,
    type: Phaser.AUTO
}

const game = new Phaser.Game(config);

game.scene.add('MainMenu', MainMenu);

game.scene.start('MainMenu');