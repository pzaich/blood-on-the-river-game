import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'chicken',
    hitbox: { width: 8, height: 8 }
})
export default class ChickenEvent extends RpgEvent {
    onInit() { this.setGraphic('chicken') }
    async onAction(player: RpgPlayer) {
        await player.showText("Bawk bawk! The chicken pecks at the floor.")
    }
}
