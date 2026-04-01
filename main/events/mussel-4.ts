import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'mussel-4',
    hitbox: { width: 8, height: 8 }
})
export default class Mussel4Event extends RpgEvent {
    private collected = false
    onInit() { this.setGraphic('mussel-sprite') }

    async onAction(player: RpgPlayer) {
        if (this.collected) { await player.showText("Already collected."); return }
        if (player.getVariable('quest_3c') !== 'active') {
            await player.showText("Mussels clinging to the rocks.")
            return
        }
        this.collected = true; if (typeof localStorage !== 'undefined') localStorage.setItem('game-sound', 'collect')
        const m = (player.getVariable('quest_3_mussels') || 0) + 1
        player.setVariable('quest_3_mussels', m)
        player.showNotification(`Mussel collected! (${m}/5)`, { time: 1500 })
    }
}
