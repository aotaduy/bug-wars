import 'phaser';
import {bugTypes} from "./constants/bug-types.constants";
import eventBus, {toolChangedEvent} from "./event-bus";


export default class GameUI extends Phaser.Scene
{
    private currentTool;
    private buttons: Phaser.GameObjects.Sprite[];
    constructor ()
    {
        super('gameUI');
        this.currentTool = bugTypes[0]
    }

    preload ()
    {
        bugTypes.forEach(each =>  this.load.spritesheet(each.name, `assets/${each.name}.png`, each.frameSize))

    }

    create ()
    {
        this.addButtons()
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
        eventBus.emit(toolChangedEvent, this.currentTool)
        console.log('emit', this.currentTool)
    }

}
