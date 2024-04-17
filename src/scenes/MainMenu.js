import Phaser from "phaser";

export default class MainMenu extends Phaser.Scene
{
    preload ()
    {

    }

    create ()
    {

        this.scene.stop('UIScene');

        function changeSceneToBaseLevel(){
            this.scene.switch('BaseLevel');
        }

        const button = this.add.text(1280/2, 720/2, 'Start Game', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center',
            fixedWidth: 260,
            backgroundColor: '#2d2d2d'
        }).setPadding(32).setOrigin(0.5);

        button.setInteractive({ useHandCursor: true });
        button.on('pointerdown', changeSceneToBaseLevel, this);
    }

    update () 
    {

    }
}