import Phaser from "phaser";
import Projectile from "./Projectile";

class Ammunition extends Phaser.Physics.Arcade.Group
{
    constructor (scene, ammo, shotSpeed, damage)
    {
        super (scene.physics.world, scene);

        this.scene = scene;

        this.createMultiple({
            frameQuantity: ammo,
            key: 'shot',
            active: false,
            visible: false,
            classType: Projectile
        });

        this.speed = shotSpeed;

        this.shot;
        this.damage = damage;

        this.ammo = ammo;
        this.bulletsRemaining = ammo;

        this.reloadTime = 5000;
    }

    fireShot (x, y, maxBounces)
    {
        this.shot = this.getFirstDead(false);

        if (this.shot)
        {
            this.shot.fire(x, y, this.speed, maxBounces, this.damage);
            this.bulletsRemaining -= 1;
            console.log(this.bulletsRemaining,'/',this.ammo);
            this.scene.ui.setAmmoUI(this.bulletsRemaining, this.ammo, this.scene.player.clipsRemaining);
        }


        // If no more bullets destroy this clip
        if (this.bulletsRemaining <= 0){
            this.destroy();
        }
    }
}

export default Ammunition;