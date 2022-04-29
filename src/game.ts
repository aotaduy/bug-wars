import 'phaser';
import Beetle from "./bugs/beetle";
import Spider from "./bugs/spider";
import Plant from "./food/plant";
import Ant from "./bugs/ant";

const bugTypes = [
    {name: 'beetle', type: Beetle, frameSize: {frameHeight: 48, frameWidth: 38} },
    {name: 'ant', type: Ant, frameSize: {frameHeight: 32, frameWidth: 32} },
    {name: 'spider', type: Spider,frameSize: {frameHeight: 64, frameWidth: 64} },
]
export default class Demo extends Phaser.Scene
{
    bugs
    private currentTool;
    private buttons: Phaser.GameObjects.Sprite[];
    constructor ()
    {
        super('demo');
        this.currentTool = bugTypes[0]
    }

    preload ()
    {
        this.load.image('dirt-background', 'assets/dirt-background.png')
        bugTypes.forEach(each =>  this.load.spritesheet(each.name, `assets/${each.name}.png`, each.frameSize))
        //this.load.spritesheet('spider-animation', 'assets/spider-animated.png', {frameHeight: 64, frameWidth: 64});
        this.load.spritesheet('plant1', 'assets/plant1.png', {frameHeight: 64, frameWidth: 64})
        this.load.spritesheet('plant2', 'assets/plant2.png', {frameHeight: 64, frameWidth: 64})
    }

    create ()
    {
        this.add.image(500, 240, 'dirt-background').setAlpha(0.5);
        this.addButtons()
        this.physics.world.setBounds(100, 0, 700, 480);
        this.bugs = bugTypes.map(each => this.physics.add.group({
            name: each.name,
            classType: each.type,
            runChildUpdate: true,
            collideWorldBounds: true,
        })
        )
        const plants = this.physics.add.staticGroup({
            name: 'plants',
            classType: Plant,
        })
        this.physics.add.collider(this.bugs, plants, this.bugCollisionPlant)
        this.physics.world.on('worldbounds', this.onWorldBounds)
        this.physics.add.overlap(this.bugs, this.bugs, (bug1, bug2) => this.handleCollision(bug1, bug2) )
        this.physics.add.collider(this.bugs, this.bugs)
        this.createPlants(plants)
        this.input.on('pointerup', (pointer) => this.createBug(pointer))

    }
    update() {
    }
    bugCollisionPlant(bug, plant){
        plant.collisionWithBug(bug)
    }
    private createBug(pointer) {
        if (pointer.x < 100) {
            return
        }
        const group = this.bugs.find(each => each.name === this.currentTool.name)
        const newBug = group.get(pointer.x, pointer.y, this.currentTool.name);
        newBug.body.onWorldBounds = true
    }

    private handleCollision(bug1, bug2: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
        bug1.collisionWith(bug2)
    }

    private addButtons() {
        this.buttons = bugTypes.map((each, index) =>  this.addButton(each, index))
            }

    private addButton(each, index) {
        const button = this.add.sprite(30, 20 + 32 + index * 64, each.name ).setInteractive()
        button.on('pointerup', (sprite) => this.selectTool( button, each))
        return button
    }

    private selectTool(sprite, each) {
        this.currentTool = each;
        this.buttons.forEach(each => each.clearTint())
        sprite.setTint(0xff7777)
    }

    private createPlants(plants) {
        for (let i = 0; i < 5; i++) {
            const rnd = Phaser.Math.RND
            plants.get(rnd.integerInRange(200, 800), rnd.integerInRange(100,360), 'plant1')
            plants.get(rnd.integerInRange(200, 800), rnd.integerInRange(100,360), 'plant2')

        }
    }

    private onWorldBounds(body) {
        body.gameObject.turnAround()
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#4f5f51',
    width: 800,
    height: 480,
    mode: Phaser.Scale.FIT,
    scene: Demo,
    scale: {
        zoom: 1.1
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },

};

const game = new Phaser.Game(config);
