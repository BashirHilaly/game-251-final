import Phaser from "phaser";
import Player from "../gameobjects/Player.js";
import playerImage from '../../dist/assets/player.png';
import floorImage from '../../dist/assets/floor.svg';
import ColorSystem from "../misc/ColorSystem.js";
import Enemy from "../gameobjects/Enemy.js";
import UI from "../misc/UI.js";


class BaseLevel extends Phaser.Scene
{

    player;
    obstacles;

    uiCam;
    ui;

    group;
    enemies;
    amountOfEnemies = 10;
    gameOver = false;

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
        // Add a vignette and blur
        this.cameras.main.postFX.addVignette(0.5, 0.5, 0.8, 0.5);
        this.cameras.main.postFX.addTiltShift(0.3, 1.0, 0.0);

        // UI Scene
        this.scene.launch('UIScene');
        this.ui = this.scene.get('UIScene');


        let background = this.add.image(0, 0, 'floor');
        background.x = background.displayWidth / 2;
        background.y = background.displayHeight / 2;
        this.xLimit = background.displayWidth; //the player cannot go beyond these x and
        this.yLimit = background.displayHeight; //y positions

        // this.cameras.main.setBounds(0, 0, this.xLimit, this.yLimit); //the camera can not go beyond the x and y bounds
        
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

        // Generate enemies
        this.group = this.add.group();
        this.group.createMultiple({
            frameQuantity: this.amountOfEnemies,
            key: 'enemy',
            active: true,
            visible: true,
            classType: Enemy
        });
        this.enemies = this.group.getChildren();

        this.player = new Player(this, this.xLimit/2, this.yLimit/2, 'player');
        this.player.create();


        // This contains enemy configuration
        for (let i = 0; i < this.enemies.length; i++)
        {
            this.enemies[i].create();
            // Configuration
            this.enemies[i].speed = 100;
            this.enemies[i].damage = 10;
        }

    }

    update ()
    {
        this.cameras.main.centerOn(this.player.x, this.player.y); //center camera on current position of player
        this.player.update();

        for (let i = 0; i < this.enemies.length; i++)
        {
            this.enemies[i].update();
        }

    }
}

export default BaseLevel;