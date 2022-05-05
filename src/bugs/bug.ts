import Vector2 = Phaser.Math.Vector2;
import {WanderAround} from "./strategies/wander-around";
import {BugStrategy} from "./strategies/bug-strategy";
import Plant from "../food/plant";
import HumanPlayer from "../player/player";
import {HealthBar} from "../accesories/health-bar";

export default class Bug extends Phaser.GameObjects.Sprite {

    strategy: BugStrategy = new WanderAround()
    defaultSpeed = 40;
    player: HumanPlayer
    food: number = 0;
    maxLife = 100;
    life = 100;
    healthBar: HealthBar
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture)
        this.setFlipX(true)
        this.healthBar = new HealthBar(scene, this)
    }
    setTarget(point: Vector2) {

    }
    update(t: number, dt: number)
    {
        this.strategy.update(this)
        this.healthBar.update()
    }
    destroy(fromScene?: boolean) {
        super.destroy(fromScene);
        this.healthBar.destroy(fromScene)
    }

    turnAround(){
        this.scene.tweens.add({
            targets: this,
            duration: 200,
            angle: '+=45',
        })
    }

    setStrategy(strategy: BugStrategy) {
        this.strategy = strategy
    }

    collisionWithPlant(plant: Plant) {

    }

    setLife(life: number) {
        this.life = life;
        this.healthBar.setValue(this.life / this.maxLife * 100)
    }
}
