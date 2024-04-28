import Phaser from 'phaser';

import MainMenu from './scenes/MainMenu';
import BaseLevel from './scenes/BaseLevel';
import UI from './misc/UI';
import Level1 from './scenes/Level1';
import Level2 from './scenes/Level2';
import Level3 from './scenes/Level3';

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
game.scene.add('UIScene', UI);
// game.scene.add('BaseLevel', BaseLevel);
game.scene.add('Level1', Level1);
game.scene.add('Level2', Level2);
game.scene.add('Level3', Level3);

game.scene.start('MainMenu');
