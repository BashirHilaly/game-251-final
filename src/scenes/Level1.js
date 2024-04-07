import Phaser from "phaser";
import floorImage from '../../dist/assets/floor.svg';
import playerImage from '../../dist/assets/temporary assets/PNG/Hitman 1/hitman1_hold.png';

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
        this.load.image('floor', floorImage);
        this.load.image('player', playerImage);

    }

    create ()
    {
        let background = this.add.image(0, 0, 'floor');
        background.x = background.displayWidth / 2;
        background.y = background.displayHeight / 2;
        this.xLimit = background.displayWidth; //the player cannot go beyond these x and
        this.yLimit = background.displayHeight; //y positions

        this.player = this.physics.add.sprite(1280/2, 720/2, 'player');

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () 
    {
        if (this.cursors.left.isDown && this.player.x >= 0)
        {
            this.player.setVelocityX(-200);
        }
        else if (this.cursors.right.isDown && this.player.x <= this.xLimit)
        {
            this.player.setVelocityX(200);
        }
        else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.y >= 0) {
            this.player.setVelocityY(-200); //move up
        }
        else if (this.cursors.down.isDown && this.player.y <= this.yLimit) {
            this.player.setVelocityY(200); //move down
        }
        else {
            this.player.setVelocityY(0); //don't move up or down
        }

        this.cameras.main.centerOn(this.player.x, this.player.y); //centre camera on current position of player}
    }
}

export default Level1;