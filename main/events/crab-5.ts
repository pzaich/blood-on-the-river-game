import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'crab-5',
    hitbox: { width: 8, height: 8 }
})
export default class Crab5Event extends RpgEvent {
    private collected = false
    onInit() { this.setGraphic('crab-sprite') }

    async onAction(player: RpgPlayer) {
        if (this.collected) { await player.showText("Already caught."); return }
        if (player.getVariable('quest_3c') !== 'active') {
            await player.showText("A crab scuttling along the sand.")
            return
        }
        this.collected = true; if (typeof localStorage !== 'undefined') localStorage.setItem('game-sound', 'collect')
        const c = (player.getVariable('quest_3_crabs') || 0) + 1
        player.setVariable('quest_3_crabs', c)
        player.showNotification(`Crab caught! (${c}/5)`, { time: 1500 })
    }
}
