import Phaser from "phaser";
import Player from "../gameobjects/Player.js";
import ColorSystem from "../misc/ColorSystem.js";
import Enemy from "../gameobjects/Enemy.js";
import playerImage from '../../dist/assets/player.png';
import SpaceshipFloor from '../../dist/assets/SpaceshipFloor.jpg';
import obstacleTextures from '../../dist/assets/SpaceshipFloor.jpg';
import enemy3img from '../../dist/assets/pests/lvl1_pest4.png';

class Level3 extends Phaser.Scene
{

    player;
    obstacles;
    amountOfObstacles = 40;
    obastacleColor;

    uiCam;
    ui;
    vignette;

    group;
    enemies;
    amountOfEnemies = 15;
    enemySpeed = 80;
    enemyDamage = 20;
    gameOver = false;

    timer;
    timeLimit = 3000 * this.amountOfEnemies;

    nextLevelKey = 'MainMenu';

    preload ()
    {
        this.load.image('player', playerImage);
        this.load.image('SpaceshipFloor', SpaceshipFloor);
        this.load.image('obstacleTextures', obstacleTextures);

        this.load.image('enemy3img', enemy3img);
    }
    
    endRound ()
    {
        if (!this.player.isDead){
            console.log('Round over');
            this.gameOver = true;
            this.physics.pause();
            this.ui.roundEnd(this.amountOfEnemies-this.enemies.length, this.amountOfEnemies, this.nextLevelKey, 'Level3');
            this.vignette.radius = .1;
            this.vignette.strength = 0.5;
        }
    }

    create ()
    {
        // Add a vignette and blur
        this.vignette = this.cameras.main.postFX.addVignette(0.5, 0.5, 0.8, 0.6);
        this.cameras.main.postFX.addTiltShift(0.3, 1.0, 0.0);

        this.timer = this.time.delayedCall(this.timeLimit, this.endRound, [], this);

        // UI Scene
        this.scene.launch('UIScene');
        this.ui = this.scene.get('UIScene');

        let background = this.add.image(0, 0, 'SpaceshipFloor');
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
        this.obastacleColor = colors.lightBrown;
        for (let i = 0; i < this.amountOfObstacles; i++)
        {
            const posX = getRandomInt(0, this.xLimit)
            const posY = getRandomInt(0, this.yLimit)

            const sizeX = getRandomInt(30, 200)
            const sizeY = getRandomInt(10, 200)

            generatedSquares.push(this.add.rectangle(posX, posY, sizeX+10, sizeY+10, colors.black));

            const obstacle = this.add.tileSprite(posX, posY, sizeX, sizeY, 'obstacleTextures');
            obstacle.tilePositionX = getRandomInt(0, this.xLimit);
            obstacle.tilePositionY = getRandomInt(0, this.yLimit);
            generatedSquares.push(obstacle);
        }
        this.obstacles = this.physics.add.staticGroup(generatedSquares);

        // Generate enemies
        this.group = this.add.group();
        this.group.createMultiple({
            frameQuantity: this.amountOfEnemies,
            key: 'enemy3img',
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
            this.enemies[i].speed = this.enemySpeed;
            this.enemies[i].damage = this.enemyDamage;

            this.enemies[i].setScale(.7,.7);
        }


    }

    update ()
    {
        this.cameras.main.centerOn(this.player.x, this.player.y); //center camera on current position of player
        this.player.update();

        // Update timer text
        if (!this.player.isDead){
            this.ui.timerText.setText(`Time: ${this.timer.getProgress().toString().substr(0, 4)} / 1`);
        }

        for (let i = 0; i < this.enemies.length; i++)
        {
            this.enemies[i].update();
        }
    }
}

export default Level3;