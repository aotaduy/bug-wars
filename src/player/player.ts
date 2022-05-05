import Vector2 = Phaser.Math.Vector2;
import Bug from "../bugs/bug";

export default class HumanPlayer {
    home: Vector2
    name: string
    food = 0
    tint = 0x00ff00
    constructor(scene: Phaser.Scene) {
        this.home = new Vector2(100, scene.scale.height / 2)
        this.name = 'player'
    }

    returnedWithFood(bug: Bug) {
        this.food = this.food + bug.food
        bug.food = 0
        console.log(this.name, 'food', this.food)
    }
}
