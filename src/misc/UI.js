import Phaser from "phaser";
import ColorSystem from "./ColorSystem";

class UI extends Phaser.Scene{

    constructor ()
    {
        super({ key: 'UIScene' });

    }

    healthBar;
    staminaBar;

    ammoUi;
    roundsText;
    clipsText;

    timerText;

    enemyUI;

    // https://phasergames.com/how-to-make-a-health-bar-in-phaser-3/ 
    createBar(x, y, color, length, thickness){

        // Drawing the bar
        const bar = this.add.graphics();

        // Add the color
        bar.fillStyle(color, 1);

        // fill bar with a rectangle
        bar.fillRect(0, 0, length, thickness);

        // Position the bar
        bar.x = x;
        bar.y = y;

        return bar;
    }

    setBarValue(bar, value){
        bar.scaleX = value/100;
    }

    setAmmoUI(rounds, totalRounds, clips){
        if (this.roundsText != null && this.clipsText != null && this.totalRounds != null){
            this.roundsText.text = `${rounds} / ${totalRounds}`;
            this.clipsText.text = `${clips}`;
        }
        else{
            this.roundsText = this.add.text(1280-20, 720-40, `0 / 0`, { fontSize: '30px' ,align: 'right' }).setOrigin(1, 1);
            this.clipsText = this.add.text(1280-20, 720-10, `0`, { fontSize: '24px' ,align: 'right' }).setOrigin(1, 1);
            // this.setAmmoUI(rounds, totalRounds, clips);
        }
    }

    gameOver()
    {
        this.add.text(1280/2, 720/3, 'GAME OVER').setOrigin(0.5, 0.5).setFontSize(74);

        const button = this.add.text(1280/2, 720/1.4, 'End', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center',
            fixedWidth: 260,
            backgroundColor: '#2d2d2d'
        }).setPadding(32).setOrigin(0.5);

        button.setInteractive({ useHandCursor: true });

        function changeToMainMenu()
        {
            this.sys.game.destroy(true);
        }

        button.on('pointerdown', changeToMainMenu, this);
    }

    roundEnd(enemiesKilled, totalEnemies, nextLevelKey, thisLevelKey) {

        // Hide everything
        this.healthBar.visible = false;
        this.bgHealth.visible = false;

        this.bgStamina.visible = false;
        this.staminaBar.visible = false;

        this.reloadingText.visible = false;
        this.roundsText.visible = false;
        this.clipsText.visible = false;

        this.timerText.visible = false;

        this.enemyUI.visible = false;

        this.add.text(1280/2, 720/12, 'Round finished').setOrigin(0.5, 0.5).setFontSize(74);

        this.add.text(1280/2, 720/4, `Grade: ${enemiesKilled}/${totalEnemies}`).setOrigin(0.5, 0.5).setFontSize(62);

        const button = this.add.text(1280/2, 720/1.4, 'Next Level', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center',
            fixedWidth: 260,
            backgroundColor: '#2d2d2d'
        }).setPadding(32).setOrigin(0.5);

        button.setInteractive({ useHandCursor: true });

        function nextLevel()
        {
            // this.scene.stop('UIScene');
            this.scene.stop(thisLevelKey);
            this.scene.stop('UIScene');
            this.scene.start(nextLevelKey);
        }

        button.on('pointerdown', nextLevel, this);

    }

    preload(){

    }

    create(){

        // this.UIText1 = this.add.text(this.x, this.y, 'TESTSING');

        const colors = new ColorSystem();

        this.bgHealth = this.createBar(10, 10, colors.hexToDecimal('ff2626'), 200, 30);
        this.healthBar = this.createBar(10, 10, colors.hexToDecimal('2eff66'), 200, 30);

        this.bgStamina = this.createBar(10, 50, colors.hexToDecimal('2f589c'), 150, 10);
        this.staminaBar = this.createBar(10, 50, colors.hexToDecimal('2679ff'), 150, 10);

        this.reloadingText = this.add.text(1280/2, 720/1.1, 'Reloading...').setOrigin(0.5, 0.5);
        this.reloadingText.visible = false;

        this.timerText = this.add.text(1280/2, 720/20, 'Time: ').setOrigin(0.5, 0.5);

        this.enemyUI = this.add.text(1280-20, 10, `0 Killed Enemies`, { fontSize: '24px' ,align: 'right' }).setOrigin(1, 0);
    }

    update(){

    }
}

export default UI;