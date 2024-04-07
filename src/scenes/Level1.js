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

    speed = 200;


    preload () 
    {
        this.load.image('floor', floorImage);
        this.load.image('player', playerImage);

    }

    create ()
    {
        this.cameras.main.setBounds(0, 0, this.xLimit, this.yLimit); //the camera can not go beyond the x and y bounds

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
        this.cameras.main.setBounds(0, 0, this.xLimit, this.yLimit);

        this.cameras.main.centerOn(this.player.x, this.player.y); //centre camera on current position of player

        //This function is for rotation of the character to where the mouse position
        // Explanation: rotation in degrees can be found by finding the change in x and y between the mouse coordinates and the player coordinates (relative to camera)
        // therefore our angle is as follows: arctan(change in y / change in x)

        let changeInY = this.input.mousePointer.y - (this.player.y - this.cameras.main.worldView.y);
        let changeInX = this.input.mousePointer.x - (this.player.x - this.cameras.main.worldView.x);

        //console.log('Change in coordinates: (', changeInX, ',', changeInY, ')');

        this.player.angle = Math.atan2(changeInY,changeInX) * (180/Math.PI); // convert the radians to degrees

        //console.log('Player angle: ', this.player.angle);

        if (this.cursors.left.isDown && this.player.x >= 0)
        {
            this.player.setVelocityX(-this.speed);
        }
        else if (this.cursors.right.isDown && this.player.x <= this.xLimit)
        {
            this.player.setVelocityX(this.speed);
        }
        else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.y >= 0) {
            this.player.setVelocityY(-this.speed); //move up
        }
        else if (this.cursors.down.isDown && this.player.y <= this.yLimit) {
            this.player.setVelocityY(this.speed); //move down
        }
        else {
            this.player.setVelocityY(0); //don't move up or down
        }

    }
}

export default Level1;