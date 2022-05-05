import Vector2 = Phaser.Math.Vector2;
import {BugStrategy} from "./bug-strategy";
import Bug from "../bug";
import {WanderAround} from "./wander-around";

export abstract class FixedTargetStrategy extends BugStrategy{

    abstract getTargetPoint(bug: Bug): Vector2
    update(bug: Bug) {
        if (this.hasReachedTarget(bug)) {
            return this.targetReached(bug)
        }
        const randomDataGenerator = Phaser.Math.RND
        const noiseSensitivity = 50;
        const noise = randomDataGenerator.rotation() / noiseSensitivity
        const rotation = Phaser.Math.Angle.Between(bug.x,bug.y, this.getTargetPoint(bug).x, this.getTargetPoint(bug).y) + noise
        bug.setRotation(rotation)
        const body = bug.body as Phaser.Physics.Arcade.Body
        const velocity = bug.scene.physics.velocityFromRotation(rotation, bug.defaultSpeed)
        body.setVelocity(velocity.x, velocity.y)
    }

    public targetReached(bug: Bug) {
        bug.setStrategy(new WanderAround(bug.defaultSpeed));
    }

    private hasReachedTarget(bug: Bug) {
        const distanceToTarget = 50;
        return this.getTargetPoint(bug).distance(bug.body.position) <= distanceToTarget
    }
}
