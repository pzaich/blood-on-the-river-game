import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'settler-4', hitbox: { width: 8, height: 8 } })
export default class Settler4Event extends RpgEvent {
    onInit() { this.setGraphic('hunt'); this.setComponentsTop(Components.text('William Laxon')) }
    async onAction(player: RpgPlayer) {
        await player.showText("I'm a blacksmith. Once we get the forge going, I'll make proper tools.", { talkWith: this })
    }
}
