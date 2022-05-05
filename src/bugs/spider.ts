import Bug from "./bug";


export default class Spider extends Bug
{

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture)
        this.setFlipX(true)
   /*     this.anims.create({
            key: 'spider-animation',
            frames: this.anims.generateFrameNumbers('spider-animated', { frames: [ 0, 1, 2 ] }),
            frameRate: 8,
            repeat: -1
        })
        this.play('spider-animation')*/
    }

    collisionWith(bug){
        bug.setAlpha(bug.alpha - 0.02)
        this.setTint(0xff0000)
        this.setAlpha(Math.min(this.alpha + 0.01, 1) )
        this.scene.tweens.add({
            targets: bug,
            x: '+=3',
            duration: 80,
            yoyo: true,
            repeat: 4
        })
        if (bug.alpha <= 0.2) {
            bug.destroy()
        }
    }
    update(t: number, dt: number)
    {
        const rnd = Phaser.Math.RND
        if (rnd.integerInRange(0,10) > 6) {
            const rotation = this.rotation + rnd.rotation() / 20
            this.setRotation(rotation)
            const body = this.body as Phaser.Physics.Arcade.Body
            const velocity = this.scene.physics.velocityFromRotation(rotation, 50)
            body.setVelocity(velocity.x, velocity.y)

        }
     //   this.x = this.x - Math.cos(this.rotation)
       //  this.y = this.y - Math.sin(this.rotation)
    }
}

