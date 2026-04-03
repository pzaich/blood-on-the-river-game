import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'powhatan-kid-2', hitbox: { width: 8, height: 8 } })
export default class PowhatanKid2Event extends RpgEvent {
    onInit() { this.setGraphic('powhatan'); this.setComponentsTop(Components.text('Running Deer')) }
    async onAction(player: RpgPlayer) {
        await player.showText("I can run faster than you! Race me to the ball field!", { talkWith: this })
    }
}
