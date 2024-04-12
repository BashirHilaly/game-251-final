import Phaser from "phaser";

class Entity extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, image, type){
        super(scene, x, y, image)

        this.scene = scene;
        this.image = image;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.type = type;
        this.isDead = false;
    }

    explode() {
        if (this.isDead)
        {
            this.isDead = true;
            this.destroy();
            console.log('Entity exploded');
        }
    }
}

export default Entity;