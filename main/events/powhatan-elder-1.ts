import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'powhatan-elder-1', hitbox: { width: 8, height: 8 } })
export default class PowhatanElder1Event extends RpgEvent {
    onInit() { this.setGraphic('powhatan'); this.setComponentsTop(Components.text('Wise Owl')) }
    async onAction(player: RpgPlayer) {
        await player.showText("The river gives us fish. The forest gives us deer. We must give back respect.", { talkWith: this })
    }
}
