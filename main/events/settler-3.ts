import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'settler-3', hitbox: { width: 8, height: 8 } })
export default class Settler3Event extends RpgEvent {
    onInit() { this.setGraphic('richard'); this.setComponentsTop(Components.text('Thomas Savage')) }
    async onAction(player: RpgPlayer) {
        await player.showText("I'm learning the Powhatan language. Did you know they call corn 'maize'?", { talkWith: this })
    }
}
