import Phaser from "phaser";

class Level1 extends Phaser.Scene
{
    // Global Variables
    player;
    obstacles;
    cursors;

    yLimit;
    xLimit;


    preload () 
    {
        this.load.image('floor', '../assets/floor.png');
    }

    create ()
    {
        this.add.circle(1280/2, 720/2, 10, 13750737);

        let background = this.add.image(0, 0, 'floor');
        background.x = background.displayWidth / 2;
        background.y = background.displayHeight / 2;
        xLimit = background.displayWidth; //the player cannot go beyond these x and
        yLimit = background.displayHeight; //y positions
    }

    update () 
    {

    }
}

export default Level1;