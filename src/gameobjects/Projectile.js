import Phaser from "phaser";

class Projectile extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y, texture, projectileSpeed)
    {
        super(scene, x, y, texture);

        this.projectileSpeed = projectileSpeed;
    }
    
    fire (x, y)
    {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(-300);

        console.log('Fired Shot!');
    }

    destroy ()
    {
        this.destroy();
    }


}

export default Projectile;