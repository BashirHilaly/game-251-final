import Phaser from 'phaser';

import MainMenu from './scenes/MainMenu';
import Level1 from './scenes/Level1';

// To run server, "npm start"

const config = {
    width: 1280,
    height: 720,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            dubug: false
        }
    }
}

const game = new Phaser.Game(config);

game.scene.add('MainMenu', MainMenu);
game.scene.add('Level1', Level1);

game.scene.start('MainMenu');
