import Phaser from 'phaser';

import MainMenu from './scenes/MainMenu';
import BaseLevel from './scenes/BaseLevel';
import UI from './misc/UI';

// To run server, "npm start"

// https://micropi.wordpress.com/2020/05/02/making-a-top-down-game-in-phaser-3/

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
game.scene.add('BaseLevel', BaseLevel);
game.scene.add('UIScene', UI);

game.scene.start('BaseLevel');
