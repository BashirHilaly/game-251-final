import Entity from './Entity';

class Player extends Entity {
    constructor(scene, x, y, image) {
        super(scene, x, y, image, 'Player');

        this.scene = scene;
        this.image = image;

        this.speed = 200;
    }

    preload(){

    }


    create(){
        //this.cursors = this.scene.input.keyboard.createCursorKeys();
        const {LEFT,RIGHT,UP,DOWN,W,A,S,D} = Phaser.Input.Keyboard.KeyCodes;
        this.keys = this.scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            down: DOWN,
            w: W,
            a: A,
            s: S,
            d: D
        });

    }
    
    update(){
        
        //This function is for rotation of the character to where the mouse position
        // Explanation: rotation in degrees can be found by finding the change in x and y between the mouse coordinates and the player coordinates (relative to camera)
        // therefore our angle is as follows: arctan(change in y / change in x)

        let changeInY = this.scene.input.mousePointer.y - (this.y - this.scene.cameras.main.worldView.y);
        let changeInX = this.scene.input.mousePointer.x - (this.x - this.scene.cameras.main.worldView.x);

        //console.log('Change in coordinates: (', changeInX, ',', changeInY, ')');

        this.angle = Math.atan2(changeInY,changeInX) * (180/Math.PI); // convert the radians to degrees

        //console.log('Player angle: ', this.player.angle);


        if (this.keys.left.isDown || this.keys.a.isDown && this.x >= 0){
            this.body.setVelocityX(-this.speed);
            //console.log('Left key pressed');
        }
        else if (this.keys.right.isDown || this.keys.d.isDown && this.x <= this.scene.xLimit)
        {
            this.body.setVelocityX(this.speed);
        }
        else {
            this.body.setVelocityX(0);
        }

        if (this.keys.up.isDown || this.keys.w.isDown && this.y >= 0){
            this.body.setVelocityY(-this.speed);
        }
        else if (this.keys.down.isDown || this.keys.s.isDown && this.y <= this.scene.yLimit)
        {
            this.body.setVelocityY(this.speed);
        }
        else {
            this.body.setVelocityY(0);
        }

    }
}

export default Player;