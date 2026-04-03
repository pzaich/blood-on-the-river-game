import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'settler-6', hitbox: { width: 8, height: 8 } })
export default class Settler6Event extends RpgEvent {
    onInit() { this.setGraphic('smith'); this.setComponentsTop(Components.text('George Kendall')) }
    async onAction(player: RpgPlayer) {
        await player.showText("I'm on the council. We must establish order in this new land.", { talkWith: this })
    }
}
