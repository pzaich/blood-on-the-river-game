import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'
@EventData({ name: 'carrot-2', hitbox: { width: 8, height: 8 } })
export default class Carrot2Event extends RpgEvent {
    private collected = false
    onInit() { this.setGraphic('carrot-sprite') }
    async onAction(player: RpgPlayer) {
        if (this.collected) { await player.showText("Already picked."); return }
        if (player.getVariable('quest_3c') !== 'active') { await player.showText("Fresh carrots grow in the soil."); return }
        this.collected = true; if (typeof localStorage !== 'undefined') localStorage.setItem('game-sound', 'collect')
        const b = (player.getVariable('quest_3_berries') || 0) + 1
        player.setVariable('quest_3_berries', b)
        player.showNotification(`Carrot picked! (${b} crops)`, { time: 1500 })
    }
}
