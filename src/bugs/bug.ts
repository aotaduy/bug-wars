import Tween = Phaser.Tweens.Tween;

export default class Bug extends Phaser.GameObjects.Sprite {

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture)
        this.setFlipX(true)
    }
    turnAround(){
        this.scene.tweens.add({
            targets: this,
            duration: 200,
            angle: '+=45',
        })
    }
}
