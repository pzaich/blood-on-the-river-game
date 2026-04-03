import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'powhatan-kid-1', hitbox: { width: 8, height: 8 } })
export default class PowhatanKid1Event extends RpgEvent {
    onInit() { this.setGraphic('powhatan'); this.setComponentsTop(Components.text('Little Fox')) }
    async onAction(player: RpgPlayer) {
        await player.showText("*giggles* You talk funny! Want to play?", { talkWith: this })
    }
}
