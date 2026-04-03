import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'settler-5', hitbox: { width: 8, height: 8 } })
export default class Settler5Event extends RpgEvent {
    onInit() { this.setGraphic('samuel'); this.setComponentsTop(Components.text('Nathaniel Peacock')) }
    async onAction(player: RpgPlayer) {
        await player.showText("Samuel! Good to see another boy here. Stick together and we'll be fine.", { talkWith: this })
    }
}
