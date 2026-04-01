import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'mussel-2',
    hitbox: { width: 32, height: 16 }
})
export default class Mussel2Event extends RpgEvent {
    private collected = false
    onInit() { this.setGraphic('mussel-sprite') }

    async onAction(player: RpgPlayer) {
        if (this.collected) { await player.showText("Already collected."); return }
        if (player.getVariable('quest_3c') !== 'active') {
            await player.showText("Mussels clinging to the rocks.")
            return
        }
        this.collected = true
        const m = (player.getVariable('quest_3_mussels') || 0) + 1
        player.setVariable('quest_3_mussels', m)
        player.showNotification(`Mussel collected! (${m}/5)`, { time: 1500 })
    }
}
