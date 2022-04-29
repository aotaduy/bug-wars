import Bug from "./bug";
import Spider from "./spider";


export default class Ant extends Bug
{

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture)
        this.setScale(0.8, 0.8)
        console.log(this.scaleX, this.scaleY)

    }

    collisionWith(bug){
        if (bug instanceof Spider) {
            this.turnAround()
        }

    }
    update(t: number, dt: number)
    {
        const rnd = Phaser.Math.RND
        if (rnd.integerInRange(0,10) > 9) {
            const rotation = this.rotation + rnd.rotation() / 20
            this.setRotation(rotation)
            const body = this.body as Phaser.Physics.Arcade.Body
            const velocity = this.scene.physics.velocityFromRotation(rotation, 40)
            body.setVelocity(velocity.x, velocity.y)

        }
     //   this.x = this.x - Math.cos(this.rotation)
       //  this.y = this.y - Math.sin(this.rotation)
    }
}

