import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'deer-hide',
    hitbox: { width: 32, height: 16 }
})
export default class DeerHideEvent extends RpgEvent {
    private collected = false
    onInit() { this.setGraphic('crate') }

    async onAction(player: RpgPlayer) {
        if (this.collected) { await player.showText("Already collected."); return }
        if (player.getVariable('quest_4c') !== 'active') {
            await player.showText("A deer hide stretched on a frame to dry.")
            return
        }
        this.collected = true
        player.setVariable('quest_4c_hide', true)
        player.showNotification("Deer hide collected!", { time: 1500 })
        if (player.getVariable('quest_4c_sinew')) {
            player.showNotification("Got both materials! Talk to the Village Elder.", { time: 3000 })
        }
    }
}
