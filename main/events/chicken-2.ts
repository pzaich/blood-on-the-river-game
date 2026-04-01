import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'chicken-2',
    hitbox: { width: 8, height: 8 }
})
export default class Chicken2Event extends RpgEvent {
    onInit() { this.setGraphic('chicken-2-sprite') }
    async onAction(player: RpgPlayer) {
        await player.showText("Bawk bawk! The chicken-2 pecks at the floor.")
    }
}
