import Entity from './Entity';

class Enemy extends Entity {
    constructor(scene, x, y, image, speed, damage) {
        super(scene, x, y, image, 'Enemy');

        this.scene = scene;
        this.image = image;

        this.speed = speed;
        this.damage = damage;
        this.health = 100;

    }

    create ()
    {

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        

        this.x = getRandomInt(0, this.scene.xLimit);
        this.y = getRandomInt(0, this.scene.yLimit);

        this.setActive(true);

        //console.log('Enemy Created');

        this.body.onCollide = true;

        this.scene.physics.add.collider(this, this.scene.obstacles, _ => {
            //console.log('test');
        });

        // Collide with other enemies
        this.scene.physics.add.collider(this, this.scene.group);


    }

    destroyEnemy() {
        this.scene.player.enemiesKilled += 1;
        console.log('Enemy killed: ', this.scene.player.enemiesKilled, ' out of ', this.scene.amountOfEnemies);
        this.scene.ui.enemyUI.setText(`${this.scene.player.enemiesKilled} Killed Enemies`);
        this.destroy();
    }

    update ()
    {

        // Horrible temporary enemy "AI"

        let changeInY = this.scene.player.y - this.y;
        let changeInX = this.scene.player.x - this.x;

        let hypotenuse = Math.sqrt(changeInX**2 + changeInY**2);

        this.body.setVelocity(this.speed * (changeInX/hypotenuse), this.speed * (changeInY/hypotenuse));

        this.angle = Math.atan2(changeInY,changeInX) * (180/Math.PI) - 90;
        

        if (this.health <= 0)
        {
            this.destroyEnemy();
        }


    }
}

export default Enemy;