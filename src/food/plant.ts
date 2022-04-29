export default class Plant extends Phaser.GameObjects.Sprite
{

    life = 100
    colorAnimation = null
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture)
    }

    collisionWithBug(bug){
        this.life = this.life - 10;
        if (!this.colorAnimation) {
            this.colorAnimation = this.scene.tweens.add({
                targets: this,
                    x: '+=3',
                duration: 80,
                yoyo: true,
                repeat: 4
            })
        }
        bug.turnAround();
        if (this.life<= 0) {
            this.destroy()
        }
    }
}
