import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'sinew-pile',
    hitbox: { width: 32, height: 16 }
})
export default class SinewPileEvent extends RpgEvent {
    private collected = false
    onInit() { this.setGraphic('barrel') }

    async onAction(player: RpgPlayer) {
        if (this.collected) { await player.showText("Already collected."); return }
        if (player.getVariable('quest_4c') !== 'active') {
            await player.showText("Strips of dried sinew, used for sewing and binding.")
            return
        }
        this.collected = true
        player.setVariable('quest_4c_sinew', true)
        player.showNotification("Sinew collected!", { time: 1500 })
        if (player.getVariable('quest_4c_hide')) {
            player.showNotification("Got both materials! Talk to the Village Elder.", { time: 3000 })
        }
    }
}
