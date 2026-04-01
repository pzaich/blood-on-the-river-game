import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'crab-3',
    hitbox: { width: 32, height: 16 }
})
export default class Crab3Event extends RpgEvent {
    private collected = false
    onInit() { this.setGraphic('crab-sprite') }

    async onAction(player: RpgPlayer) {
        if (this.collected) { await player.showText("Already caught."); return }
        if (player.getVariable('quest_3c') !== 'active') {
            await player.showText("A crab scuttling along the sand.")
            return
        }
        this.collected = true
        const c = (player.getVariable('quest_3_crabs') || 0) + 1
        player.setVariable('quest_3_crabs', c)
        player.showNotification(`Crab caught! (${c}/5)`, { time: 1500 })
    }
}
