import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'powhatan-woman-2', hitbox: { width: 8, height: 8 } })
export default class PowhatanWoman2Event extends RpgEvent {
    onInit() { this.setGraphic('powhatan'); this.setComponentsTop(Components.text('Morning Star')) }
    async onAction(player: RpgPlayer) {
        await player.showText("Welcome, young one. Try some of our corn bread — it will give you strength.", { talkWith: this })
    }
}
