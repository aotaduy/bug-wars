import {BugStrategy} from "./bug-strategy";
import Bug from "../bug";

export  class RunawayStrategy extends BugStrategy{

    prevStrategy: BugStrategy
    target: Bug
    constructor(prev, target) {
        super();
        this.prevStrategy = prev
        this.target = target
    }

    update(bug: Bug) {
        if (Phaser.Math.Distance.BetweenPointsSquared(bug, this.target) > 70*70) {
            bug.setStrategy(this.prevStrategy)
            return
        }
        const randomDataGenerator = Phaser.Math.RND
        const rotation = Phaser.Math.Angle.Between(bug.x,bug.y, this.target.x, this.target.y) + Phaser.Math.PI2 / 2
        bug.setRotation(rotation)
        const body = bug.body as Phaser.Physics.Arcade.Body
        const velocity = bug.scene.physics.velocityFromRotation(rotation, bug.defaultSpeed * 1.4)
        body.setVelocity(velocity.x, velocity.y)
    }

}
