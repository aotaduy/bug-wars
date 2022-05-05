import Vector2 = Phaser.Math.Vector2;
import {BugStrategy} from "./bug-strategy";
import Bug from "../bug";
import {WanderAround} from "./wander-around";
import {FixedTargetStrategy} from "./fixed-target";

export  class FixedTargetPointStrategy extends FixedTargetStrategy{

    target: Vector2
    constructor(target) {
        super()
        this.target = target
    }

    getTargetPoint(bug: Bug){
        return this.target
    }

}
