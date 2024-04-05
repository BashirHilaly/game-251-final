import Phaser from "phaser";

export default class MainMenu extends Phaser.Scene
{
    preload ()
    {

    }

    create ()
    {
        const helloWorldText = this.add.text(1280/2, 720/2, 'Hello World!');

        helloWorldText.setOrigin(0.5, 0.5);
    }

    update () 
    {

    }
}