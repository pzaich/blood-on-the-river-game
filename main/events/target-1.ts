import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'target-1',
    hitbox: { width: 32, height: 16 }
})
export default class Target1Event extends RpgEvent {
    private hitCooldown = false

    onInit() {
        this.setGraphic('crate') // placeholder
    }

    async onAction(player: RpgPlayer) {
        if (this.hitCooldown) return
        this.hitCooldown = true
        setTimeout(() => { this.hitCooldown = false }, 1500)

        const q3a = player.getVariable('quest_3a')
        const q3b = player.getVariable('quest_3b')

        if (q3a === 'active') {
            const hits = (player.getVariable('quest_3a_hits') || 0) + 1
            player.setVariable('quest_3a_hits', hits)
            player.showNotification(`Sword hit! (${hits}/2)`, { time: 1500 })
            if (hits >= 2) player.showNotification("Sword training done! Talk to the hunter.", { time: 3000 })
        } else if (q3b === 'active') {
            const hits = (player.getVariable('quest_3b_hits') || 0) + 1
            player.setVariable('quest_3b_hits', hits)
            player.showNotification(`Musket hit! (${hits}/2)`, { time: 1500 })
            if (hits >= 2) player.showNotification("Musket training done! Talk to the hunter.", { time: 3000 })
        } else {
            await player.showText("A training target.")
        }
    }
}
