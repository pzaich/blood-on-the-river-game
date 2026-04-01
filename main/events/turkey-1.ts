import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'
@EventData({ name: 'turkey-1', hitbox: { width: 16, height: 16 } })
export default class Turkey1Event extends RpgEvent {
    private caught = false
    onInit() { this.setGraphic('turkey-sprite') }
    async onAction(player: RpgPlayer) {
        if (this.caught) { await player.showText("Already caught."); return }
        if (player.getVariable('quest_3d') !== 'active') { await player.showText("A wild turkey gobbles around the forest."); return }
        this.caught = true
        const r = (player.getVariable('quest_3_rabbits') || 0) + 1
        player.setVariable('quest_3_rabbits', r)
        player.showNotification(`Turkey caught! (${r}/3 animals)`, { time: 1500 })
        if (r >= 3) player.showNotification("All animals caught! Talk to Namontack.", { time: 3000 })
    }
}
