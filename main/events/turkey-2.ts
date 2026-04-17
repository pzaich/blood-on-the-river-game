import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'
@EventData({ name: 'turkey-2', hitbox: { width: 8, height: 8 } })
export default class Turkey2Event extends RpgEvent {
    private caught = false
    onInit() { this.setGraphic('turkey') }
    async onAction(player: RpgPlayer) {
        if (this.caught) { await player.showText("Already caught."); return }
        if (player.getVariable('quest_3d') !== 'active') { await player.showText("A wild turkey struts through the brush."); return }
        this.caught = true; if (typeof localStorage !== 'undefined') localStorage.setItem('game-sound', 'animal')
        const r = (player.getVariable('quest_3_rabbits') || 0) + 1
        player.setVariable('quest_3_rabbits', r)
        player.showNotification(`Turkey caught! (${r}/3 animals)`, { time: 1500 })
        if (r >= 3) player.showNotification("All animals caught! Talk to Namontack.", { time: 3000 })
    }
}
