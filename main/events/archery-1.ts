import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'archery-1',
    hitbox: { width: 8, height: 8 }
})
export default class Archery1Event extends RpgEvent {
    private hitCooldown = false
    onInit() { this.setGraphic('crate') }

    async onAction(player: RpgPlayer) {
        if (player.getVariable('quest_4b') !== 'active') {
            await player.showText("An archery target made of woven reeds.")
            return
        }
        if (this.hitCooldown) return
        this.hitCooldown = true
        setTimeout(() => { this.hitCooldown = false }, 2000)

        const hits = (player.getVariable('quest_4b_hits') || 0) + 1
        player.setVariable('quest_4b_hits', hits)
        player.showNotification(`Arrow hits! (${hits}/3)`, { time: 1500 })
        if (hits >= 3) {
            player.showNotification("Archery complete! Talk to Namontack.", { time: 3000 })
        }
    }
}
