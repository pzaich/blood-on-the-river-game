import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'berry-2',
    hitbox: { width: 8, height: 8 }
})
export default class Berry2Event extends RpgEvent {
    private collected = false
    onInit() { this.setGraphic('berry') }
    async onAction(player: RpgPlayer) {
        if (this.collected) { await player.showText("Already picked."); return }
        if (player.getVariable('quest_3c') !== 'active') {
            await player.showText("Wild berries! They look delicious.")
            return
        }
        this.collected = true; if (typeof localStorage !== 'undefined') localStorage.setItem('game-sound', 'collect')
        const b = (player.getVariable('quest_3_berries') || 0) + 1
        player.setVariable('quest_3_berries', b)
        player.showNotification(`Berries collected! (${b}/3)`, { time: 1500 })
    }
}
