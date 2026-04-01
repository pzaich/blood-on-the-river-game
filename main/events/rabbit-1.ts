import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'rabbit-1',
    hitbox: { width: 16, height: 16 }
})
export default class Rabbit1Event extends RpgEvent {
    private caught = false
    onInit() { this.setGraphic('richard') }

    async onAction(player: RpgPlayer) {
        if (this.caught) { await player.showText("Already caught."); return }
        if (player.getVariable('quest_3d') !== 'active') {
            await player.showText("A rabbit hops around the forest.")
            return
        }
        this.caught = true; if (typeof localStorage !== 'undefined') localStorage.setItem('game-sound', 'animal')
        const r = (player.getVariable('quest_3_rabbits') || 0) + 1
        player.setVariable('quest_3_rabbits', r)
        player.showNotification(`Rabbit caught! (${r}/3)`, { time: 1500 })
        if (r >= 3) player.showNotification("All rabbits caught! Talk to the hunter.", { time: 3000 })
    }
}
