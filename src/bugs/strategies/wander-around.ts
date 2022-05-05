import Vector2 = Phaser.Math.Vector2;
import {BugStrategy} from "./bug-strategy";
import Bug from "../bug";

export class WanderAround extends BugStrategy{

    update(bug: Bug) {
        const randomDataGenerator = Phaser.Math.RND
        const noiseSensitivity = 30;
        const delta = randomDataGenerator.rotation() / noiseSensitivity
        bug.setRotation(bug.rotation + delta)
        const body = bug.body as Phaser.Physics.Arcade.Body
        const velocity = bug.scene.physics.velocityFromRotation(bug.rotation, bug.defaultSpeed)
        body.setVelocity(velocity.x, velocity.y)
    }

}
