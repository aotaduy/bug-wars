import Bug from "../bugs/bug";

export default class Plant extends Phaser.GameObjects.Sprite
{

    life = 60
    colorAnimation = null
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture)
    }

    collisionWithBug(bug: Bug){
        if (!this.colorAnimation) {
            this.colorAnimation = this.scene.tweens.add({
                targets: this,
                    x: '+=3',
                duration: 80,
                yoyo: true,
                repeat: 4
            })
        }
        this.setScale(this.life / 60, this.life / 60)
        bug.collisionWithPlant(this);
        if (this.life<= 0) {
            this.destroy()
        }
    }
}
