import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'pig',
    hitbox: { width: 8, height: 8 }
})
export default class PigEvent extends RpgEvent {
    onInit() { this.setGraphic('pig-sprite') }
    async onAction(player: RpgPlayer) {
        await player.showText("Oink! The pig snuffles around looking for scraps.")
    }
}
