import Phaser from "phaser";

export default class MainMenu extends Phaser.Scene
{
    preload ()
    {

    }

    create ()
    {
        function changeSceneToLvl1(){
            this.scene.switch('Level1');
        }

        const helloWorldText = this.add.text(1280/2, 720/2, 'Start Game', { backgroundColor: "#77ede9", color: "#1f1f1f", padding: {x: 10, y: 10} });
        helloWorldText.setOrigin(0.5, 0.5);
        helloWorldText.setInteractive();
        helloWorldText.on('pointerdown', changeSceneToLvl1, this);
    }

    update () 
    {

    }
}