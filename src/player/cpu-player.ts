import Vector2 = Phaser.Math.Vector2;
import HumanPlayer from "./player";
import Demo from "../game";

export default class CpuPlayer extends HumanPlayer {

    t0
    constructor(scene: Phaser.Scene) {
        super(scene)
        this.home = new Vector2(scene.scale.width, scene.scale.height / 2)
        this.name = 'cpu'
        this.tint = 0xffff00
    }

    update(t: number,  scene: Demo) {
        this.t0 = this.t0 || t;
        const dt = t - this.t0;
        if (dt > 2000) {
            this.t0 = t;
            const rnd = Phaser.Math.RND
            scene.createPlayerBug(
                this,
                rnd.integerInRange(100, scene.scale.width),
                rnd.integerInRange(0, scene.scale.height),
                'ant')
        }
    }
}
