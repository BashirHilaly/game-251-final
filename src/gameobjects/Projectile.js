import Phaser from "phaser";

class Projectile extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y, texture)
    {
        super(scene, x, y, texture);

    }
    
    fire (x, y, speed)
    {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        // Using mouse position to calculate Velocity vector. To normalize the values we divide by the hypotenuse
        let changeInY = this.scene.input.mousePointer.y - (this.y - this.scene.cameras.main.worldView.y);
        let changeInX = this.scene.input.mousePointer.x - (this.x - this.scene.cameras.main.worldView.x);

        let hypotenuse = Math.sqrt(changeInX**2 + changeInY**2);

        console.log('Fired Shot Velocity: ', changeInX/hypotenuse,', ',changeInY/hypotenuse);

        this.setVelocity(speed * (changeInX/hypotenuse), speed * (changeInY/hypotenuse));

    }

    destroy ()
    {
        this.destroy();
    }


}

export default Projectile;