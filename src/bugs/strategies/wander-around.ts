import Vector2 = Phaser.Math.Vector2;
import {BugStrategy} from "./bug-strategy";
import Bug from "../bug";

export class WanderAround extends BugStrategy{

    speed;
    noiseSensitivity;
    constructor(speed, noiseSensitivity = 30 ) {
        super();
        this.speed = speed
        this.noiseSensitivity = noiseSensitivity
    }
    update(bug: Bug) {
        const randomDataGenerator = Phaser.Math.RND
        const delta = randomDataGenerator.rotation() / this.noiseSensitivity
        bug.setRotation(bug.rotation + delta)
        const body = bug.body as Phaser.Physics.Arcade.Body
        const velocity = bug.scene.physics.velocityFromRotation(bug.rotation, this.speed)
        body.setVelocity(velocity.x, velocity.y)
    }

}
