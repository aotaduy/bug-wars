import 'phaser';
import Plant from "./food/plant";
import eventBus, {toolChangedEvent} from "./event-bus";
import {bugTypes} from "./constants/bug-types.constants";
import GameUI from "./game-ui";
import HumanPlayer from "./player/player";
import CpuPlayer from "./player/cpu-player";
import Vector2 = Phaser.Math.Vector2;


export default class Demo extends Phaser.Scene
{
    bugs
    private currentTool;
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
        this.createPLayers()
        this.scene.launch('gameUI')
        this.add.image(500, 240, 'dirt-background').setAlpha(0.5);
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
        //this.physics.add.collider(this.bugs, this.bugs)
        this.createPlants(plants)
        this.input.on('pointerup', (pointer) => this.createPlayerBug(this.player(), pointer.x, pointer.y, this.currentTool.name))
        eventBus.on(toolChangedEvent, this.changeTool, this)

    }
    update(t, dt) {
        this.cpuPlayer().update(t, this)
    }
    bugCollisionPlant(bug, plant){
        plant.collisionWithBug(bug)
    }
    createPlayerBug(player, x, y, name) {
        if (x < 100) {
            return
        }
        const group = this.bugs.find(each => each.name === name)
        const newBug = group.get(player.home.x, player.home.y, name);
        newBug.player = player
        newBug.setTint(player.tint)
        newBug.setTarget(new Vector2(x, y))
        newBug.body.onWorldBounds = true
    }

    private handleCollision(bug1, bug2: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
        bug1.collisionWith(bug2)
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

    private changeTool(tool) {
        console.log(tool)
        this.currentTool = tool

    }

    private createPLayers() {
        this.registry.set('player', new HumanPlayer(this))
        this.registry.set('cpu', new CpuPlayer(this))
    }

    private player(): HumanPlayer {
        return this.registry.get('player')
    }
    private cpuPlayer(): CpuPlayer {
        return this.registry.get('cpu')
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#9f9f91',
    width: 800,
    height: 480,
    mode: Phaser.Scale.FIT,
    scene: [Demo, GameUI ],
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
