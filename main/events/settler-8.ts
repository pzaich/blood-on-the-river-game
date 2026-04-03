import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'settler-8', hitbox: { width: 8, height: 8 } })
export default class Settler8Event extends RpgEvent {
    onInit() { this.setGraphic('samuel'); this.setComponentsTop(Components.text('James Brumfield')) }
    async onAction(player: RpgPlayer) {
        await player.showText("I'm a laborer. There's no shortage of work here — that's for certain.", { talkWith: this })
    }
}
