import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'settler-10', hitbox: { width: 8, height: 8 } })
export default class Settler10Event extends RpgEvent {
    onInit() { this.setGraphic('samuel'); this.setComponentsTop(Components.text('Samuel Collier')) }
    async onAction(player: RpgPlayer) {
        await player.showText("Wait... that's you! You're looking at yourself, Samuel!", { talkWith: this })
    }
}
