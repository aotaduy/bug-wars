import Vector2 = Phaser.Math.Vector2;
import {BugStrategy} from "./bug-strategy";
import Bug from "../bug";
import {WanderAround} from "./wander-around";
import {FixedTargetStrategy} from "./fixed-target";

export  class BackHomeStrategy extends FixedTargetStrategy {

    prevStrategy: BugStrategy
    constructor(prev) {
        super();
        this.prevStrategy = prev
    }
    getTargetPoint(bug: Bug){
        return bug.player.home
    }

    public targetReached(bug: Bug) {
        bug.player.returnedWithFood(bug)
        bug.setStrategy(this.prevStrategy);
    }
}
