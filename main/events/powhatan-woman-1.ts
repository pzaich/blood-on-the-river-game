import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'powhatan-woman-1', hitbox: { width: 8, height: 8 } })
export default class PowhatanWoman1Event extends RpgEvent {
    onInit() { this.setGraphic('powhatan'); this.setComponentsTop(Components.text('Bright Moon')) }
    async onAction(player: RpgPlayer) {
        await player.showText("I am weaving a basket. Our women make baskets, pots, and tend the crops.", { talkWith: this })
    }
}
