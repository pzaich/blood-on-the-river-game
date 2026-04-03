import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'settler-2', hitbox: { width: 8, height: 8 } })
export default class Settler2Event extends RpgEvent {
    onInit() { this.setGraphic('samuel'); this.setComponentsTop(Components.text('John Martin')) }
    async onAction(player: RpgPlayer) {
        await player.showText("This Virginia heat is nothing like England! But we'll make it work.", { talkWith: this })
    }
}
