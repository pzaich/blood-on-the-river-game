import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'pig-2',
    hitbox: { width: 8, height: 8 }
})
export default class Pig2Event extends RpgEvent {
    onInit() { this.setGraphic('pig') }
    async onAction(player: RpgPlayer) {
        await player.showText("Oink! The pig-2 snuffles around looking for scraps.")
    }
}
