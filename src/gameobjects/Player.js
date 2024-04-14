import Entity from './Entity';
import ColorSystem from '../misc/ColorSystem';
import Ammunition from './Ammunition';

class Player extends Entity {
    constructor(scene, x, y, image) {
        super(scene, x, y, image, 'Player');

        this.scene = scene;
        this.image = image;

        this.health;

        this.speed = 200;

        this.isSprinting = false;
        this.canSprint = true;
        this.stamina = 400;
        this.sprintTime = 0;
        this.staminaRegen = 0;
        this.staminaRegenTime = 600;

        this.bullets;

        this.enemiesKilled = 0;

    }

    preload(){

    }

    create(){
        //this.cursors = this.scene.input.keyboard.createCursorKeys();
        const {LEFT,RIGHT,UP,DOWN,W,A,S,D,SHIFT} = Phaser.Input.Keyboard.KeyCodes;
        this.keys = this.scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            down: DOWN,
            w: W,
            a: A,
            s: S,
            d: D,
            shift: SHIFT
        });

        this.body.onCollide = true;

        this.scene.physics.add.collider(this, this.scene.obstacles);

        // Color system
        const colors = new ColorSystem();

        // Weapon Initialization
        this.bullets = new Ammunition(this.scene, 10, 1000);

        this.scene.input.on('pointerdown', (pointer) => {
            this.bullets.fireShot(this.x, this.y, 0);
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
        
        // Sprinting mechanic
        this.speed = 200; // Normal speed
        if (this.canSprint)
        {
            if (this.sprintTime > this.stamina)
            {
                this.canSprint = false;
            }
            if (!this.keys.shift.isDown || this.sprintTime > this.stamina){
                this.isSprinting = false;
            }
            else if (this.keys.shift.isDown && this.sprintTime < this.stamina){
                this.isSprinting = true;
            }
    
            if (this.isSprinting && this.canSprint)
            {
                this.speed = this.speed + this.speed;
                this.sprintTime += 1;
                //console.log('Sprint Time: ', this.sprintTime);
            }
        }
        else {
            this.speed = 200;
            // Regenerate stamina
            this.staminaRegen += 1;
            if (this.staminaRegen == this.staminaRegenTime){
                this.staminaRegen = 0;
                this.canSprint = true;
                this.sprintTime = 0;
            }
            //console.log('Stamina Regeneration: ', this.staminaRegen,'/',this.staminaRegenTime);
        }


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