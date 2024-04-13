import Phaser from "phaser";
import Projectile from "./Projectile";

class Ammunition extends Phaser.Physics.Arcade.Group
{
    constructor (scene, clips, shotSpeed)
    {
        super (scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: clips,
            key: 'shot',
            active: false,
            visible: false,
            classType: Projectile
        });

        this.speed = shotSpeed;

        this.shot;

    }

    fireShot (x, y, maxBounces)
    {
        this.shot = this.getFirstDead(false);

        if (this.shot)
        {
            this.shot.fire(x, y, this.speed, maxBounces);
        }
    }
}

export default Ammunition;