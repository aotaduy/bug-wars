import 'phaser';

const eventBus = new Phaser.Events.EventEmitter()

export default eventBus

export const toolChangedEvent = 'toolChangedEvent'
