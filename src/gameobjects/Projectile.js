import Phaser from "phaser";

class Projectile extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y, texture)
    {
        super(scene, x, y, texture);

        this.onCollide = true;
        
    }
    
    fire (x, y, speed, maxBounces, damage)
    {
        this.body.reset(x, y);

        this.setScale(.75, .75);

        this.setActive(true);
        this.setVisible(true);

        // Using mouse position to calculate Velocity vector. To normalize the values we divide by the hypotenuse
        let changeInY = this.scene.input.mousePointer.y - (this.y - this.scene.cameras.main.worldView.y);
        let changeInX = this.scene.input.mousePointer.x - (this.x - this.scene.cameras.main.worldView.x);

        let hypotenuse = Math.sqrt(changeInX**2 + changeInY**2);

        // console.log('Fired Shot Velocity: ', changeInX/hypotenuse,', ',changeInY/hypotenuse);

        this.setVelocity(speed * (changeInX/hypotenuse), speed * (changeInY/hypotenuse));
        this.setBounce(1,1);

        var bounces = 0;

        // Hit enemy and do damage
        this.scene.physics.add.collider(this, this.scene.enemies, (bullet, enemy) => {
            //console.log('Enemy: ', enemy, 'Hit by: ', bullet);
            enemy.health -= damage;
            this.destroyBullet();
        });

        this.scene.physics.add.collider(this, this.scene.obstacles, _ => {
            if (bounces >= maxBounces)
            {
                this.destroyBullet();
            }
            else{
                bounces += 1;
                //console.log('Bounces: ', bounces);
            }
        });
    }

    destroyBullet ()
    {
        //console.log('Destroying bullet');
        this.destroy();
    }


}

export default Projectile;