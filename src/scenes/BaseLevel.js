import Phaser from "phaser";
import Player from "../gameobjects/Player.js";
import playerImage from '../../dist/assets/player.png';
import floorImage from '../../dist/assets/floor.svg';
import ColorSystem from "../misc/ColorSystem.js";
import Enemy from "../gameobjects/Enemy.js";


class BaseLevel extends Phaser.Scene
{

    player;
    obstacles;

    enemies;
    enemy;

    preload ()
    {
        this.load.image('player', playerImage);
        this.load.image('floor', floorImage);
        
    }
    
    createBar(x, y, color){

        // Drawing the bar
        const bar = this.add.graphics();

        // Add the color
        bar.fillStyle(color, 1);

        // fill bar with a rectangle
        bar.fillRect(0, 0, 200, 50);

        // Position the bar
        bar.x = x;
        bar.y = y;

        return bar;
    }
    setBarValue(bar, value){
        bar.scaleX = value/100;
    }

    create ()
    {

        let background = this.add.image(0, 0, 'floor');
        background.x = background.displayWidth / 2;
        background.y = background.displayHeight / 2;
        this.xLimit = background.displayWidth; //the player cannot go beyond these x and
        this.yLimit = background.displayHeight; //y positions

        this.cameras.main.setBounds(0, 0, this.xLimit, this.yLimit); //the camera can not go beyond the x and y bounds

        // Define key codes

        
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        // Get colors
        const colors = new ColorSystem();

        // Generate obstacles
        const generatedSquares = [];
        const amountOfObstacles = 40;
        for (let i = 0; i < amountOfObstacles; i++)
        {
            generatedSquares.push(this.add.rectangle(getRandomInt(0, this.xLimit), getRandomInt(0, this.yLimit), getRandomInt(30, 200), getRandomInt(10, 200), colors.darkGray));
        }
        this.obstacles = this.physics.add.staticGroup(generatedSquares);

        this.player = new Player(this, this.xLimit/2, this.yLimit/2, 'player');
        this.player.create();

        this.physics.add.collider(this.player, this.obstacles);

        // Generate enemies
        this.enemy = new Enemy(this, getRandomInt(0, this.xLimit), getRandomInt(0, this.yLimit), 'image');
        this.enemy.create();

        this.physics.add.collider(this.enemy, this.obstacles);

        // this.physics.world.on('collide', (body1, body2) =>
        // {
        //     console.log('Collide');
        // });

    }

    update ()
    {
        this.cameras.main.centerOn(this.player.x, this.player.y); //centre camera on current position of player
        this.player.update();

        this.enemy.update();
    }
}

export default BaseLevel;