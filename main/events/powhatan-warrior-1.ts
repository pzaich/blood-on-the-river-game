import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'powhatan-warrior-1', hitbox: { width: 8, height: 8 } })
export default class PowhatanWarrior1Event extends RpgEvent {
    onInit() { this.setGraphic('powhatan'); this.setComponentsTop(Components.text('Strong Bear')) }
    async onAction(player: RpgPlayer) {
        await player.showText("I guard our village. Your people are welcome here — as long as you come in peace.", { talkWith: this })
    }
}
