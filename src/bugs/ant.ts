import Bug from "./bug";
import Spider from "./spider";
import {FixedTargetPointStrategy} from "./strategies/fixed-target-point";
import Plant from "../food/plant";
import {BackHomeStrategy} from "./strategies/back-home";
import Vector2 = Phaser.Math.Vector2;
import {RunawayStrategy} from "./strategies/runaway";



export default class Ant extends Bug
{

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture)
        this.setScale(1, 1)
    }

    setTarget(point: Phaser.Math.Vector2) {
        this.strategy = new FixedTargetPointStrategy(point)
    }

    collisionWith(bug: Bug){
        if (bug.player === this.player) {
            return
        }
        if (bug instanceof Spider) {
            this.turnAround()
        }
        bug.setLife(bug.life - 5)
        this.bumpOnMyDirection(bug)
        if (bug.life <= 0) {
            bug.destroy()
        }
    }
    collisionWithPlant(plant: Plant) {
        if (!this.carriesFood()) {
            this.food = 10;
            plant.life = plant.life - this.food;
            this.strategy = new BackHomeStrategy(new FixedTargetPointStrategy(new Vector2(plant.x, plant.y)))
        } else {
            this.turnAround()
        }
    }

    private carriesFood() {
        return this.food > 0;
    }

    private bumpOnMyDirection(bug: Bug) {
        const position = bug.scene.physics.velocityFromRotation(this.rotation, 3)
        bug.setPosition(bug.x + position.x, bug.y + position.y)
        this.setPosition(this.x - position.x, this.y - position.y)
    }
}

