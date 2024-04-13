import Entity from './Entity';

class Enemy extends Entity {
    constructor(scene, x, y, image) {
        super(scene, x, y, image, 'Enemy');

        this.scene = scene;
        this.image = image;

        this.speed = 120;

    }

    create ()
    {
        this.body.onCollide = true;

    }

    update ()
    {

        // Horrible temporary enemy "AI"

        let changeInY = this.scene.player.y - this.y;
        let changeInX = this.scene.player.x - this.x;

        let hypotenuse = Math.sqrt(changeInX**2 + changeInY**2);

        this.body.setVelocity(this.speed * (changeInX/hypotenuse), this.speed * (changeInY/hypotenuse));

    }
}

export default Enemy;