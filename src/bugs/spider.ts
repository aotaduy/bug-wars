import Bug from "./bug";
import {WanderAround} from "./strategies/wander-around";
import {FixedTargetPointStrategy} from "./strategies/fixed-target-point";


export default class Spider extends Bug
{


    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture)
        this.setFlipX(true)
        this.defaultSpeed = 2
        this.strategy = new WanderAround(this.defaultSpeed, 200)
        this.life = 80
   /*     this.anims.create({
            key: 'spider-animation',
            frames: this.anims.generateFrameNumbers('spider-animated', { frames: [ 0, 1, 2 ] }),
            frameRate: 8,
            repeat: -1
        })
        this.play('spider-animation')*/
    }

    setTarget(point: Phaser.Math.Vector2) {
      this.x = point.x;
      this.y = point.y;
      this.scene.tweens.add({
            targets: this,
            duration: 500,
            scaleX: {start: 2, to: 1 },
            scaleY: {start: 2, to: 1 },
        })

    }
    collisionWith(bug){
        if (bug.player === this.player) {
            return
        }
        this.scene.tweens.add({
            targets: bug,
            x: '+=3',
            duration: 80,
            yoyo: true,
            repeat: 4
        })
        bug.setLife(bug.life - 10)
        this.setLife(this.life + 2)
       // this.bumpOnMyDirection(bug)
        if (bug.life <= 0) {
            bug.destroy()
        }
    }

}

