import Bug from "./bug";
import Spider from "./spider";
import {FixedTargetPointStrategy} from "./strategies/fixed-target-point";


export default class Beetle extends Bug
{

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture)
        this.setFlipX(true)
        this.defaultSpeed = 30
    }

    collisionWith(bug){
        if (bug instanceof Spider) {
            this.turnAround()
        }
    }
    setTarget(point: Phaser.Math.Vector2) {
        const rotation = Phaser.Math.Angle.Between(this.x, this.y, point.x, point.y)
        this.setRotation(rotation)
    }
}

