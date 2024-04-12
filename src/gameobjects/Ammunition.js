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

    }

    fireShot (x, y)
    {
        const shot = this.getFirstDead(false);

        if (shot)
        {
            shot.fire(x, y, this.speed);
        }
    }
}

export default Ammunition;