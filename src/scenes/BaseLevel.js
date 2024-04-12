import Phaser from "phaser";
import Player from "../gameobjects/Player.js";
import playerImage from '../../dist/assets/player.png';
import floorImage from '../../dist/assets/floor.svg';



class BaseLevel extends Phaser.Scene
{

    player;
    obstacles;

    preload ()
    {
        this.load.image('player', playerImage);
        this.load.image('floor', floorImage);
        
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

        this.player = new Player(this, this.xLimit/2, this.yLimit/2, 'player');
        this.player.create();

        
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };


        // Generate obstacles
        const generatedSquares = [];
        const amountOfObstacles = 40;
        for (let i = 0; i < amountOfObstacles; i++)
        {
            generatedSquares.push(this.add.rectangle(getRandomInt(0, this.xLimit), getRandomInt(0, this.yLimit), getRandomInt(30, 200), getRandomInt(10, 200), 3552822));
        }
        this.obstacles = this.physics.add.staticGroup(generatedSquares);

        this.physics.add.collider(this.player, this.obstacles);


    }

    update ()
    {
        this.cameras.main.centerOn(this.player.x, this.player.y); //centre camera on current position of player
        this.player.update();
    }
}

export default BaseLevel;