import Entity from './Entity';
import ColorSystem from '../misc/ColorSystem';
import Ammunition from './Ammunition';

class Player extends Entity {
    constructor(scene, x, y, image) {
        super(scene, x, y, image, 'Player');

        this.scene = scene;
        this.image = image;

        this.health = 100;

        this.speed = 200;

        this.isSprinting = false;
        this.canSprint = true;
        this.stamina = 400;
        this.sprintTime = 0;
        this.staminaRegen = 0;
        this.staminaRegenTime = 600;

        this.bullets;
        this.clips = 10;
        this.clipsRemaining = this.clips;
        this.reloadTime = 1000;

        this.enemiesKilled = 0;

    }

    preload(){

    }

    createNewClip()
    {
        this.bullets = new Ammunition(this.scene, 10, 1000, 30);
    }
    
    reload(_this){
        // Throw out old clip
        _this.bullets.destroy();
        _this.bullets = null;
        _this.clipsRemaining -= 1;
        // Check if we have any more clips remaining then create new clip to reload
        if (_this.clipsRemaining > 0){
            _this.createNewClip();
        }
    }

    takeDamage(damage){
        this.health -= damage;
        console.log('Player Health: ', this.health);
        if (this.health <= 0){
            this.killPlayer();
        }
    }

    killPlayer(){
        console.log('You Died!');
        this.scene.gameOver = true;
        this.scene.physics.pause();
        this.scene.add.text(this.x, this.y, 'GAME OVER').setOrigin(0.5, 0.5).setFontSize(64);
    }

    create(){
        //this.cursors = this.scene.input.keyboard.createCursorKeys();
        const {LEFT,RIGHT,UP,DOWN,W,A,S,D,SHIFT,R} = Phaser.Input.Keyboard.KeyCodes;
        this.keys = this.scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            down: DOWN,
            w: W,
            a: A,
            s: S,
            d: D,
            shift: SHIFT,
            r: R
        });


        this.body.onCollide = true;

        this.scene.physics.add.collider(this, this.scene.obstacles);
        this.scene.physics.add.collider(this, this.scene.enemies, (player, enemy) => {
            const damageTaken = enemy.damage / 75; // Adjust the divisor number so the damage is not too much
            this.takeDamage(damageTaken);
        });

        // Color system
        const colors = new ColorSystem();

        // Weapon Initialization
        this.createNewClip();

        this.scene.input.on('pointerdown', (pointer) => {
            if (this.bullets && this.bullets.bulletsRemaining > 0){
                this.bullets.fireShot(this.x, this.y, 0);
            }
            else {
                console.log('No ammo');
            }
        });


    }
    
    update(){
        
        if (!this.scene.gameOver){
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
                    this.speed = this.speed + this.speed/1.5;
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

            // Movement
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

            // Reloading
            if (this.bullets && this.bullets.bulletsRemaining != this.bullets.ammo && this.keys.r._justUp){
                this.keys.r._justUp = false;
                console.log("Reloading...");
                setTimeout(() => { this.reload(this); }, this.reloadTime);
            }

        }

    }
}

export default Player;