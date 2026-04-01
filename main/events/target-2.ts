import { RpgEvent, EventData, RpgPlayer, Move } from '@rpgjs/server'

@EventData({
    name: 'target-2',
    hitbox: { width: 24, height: 16 }
})
export default class Target2Event extends RpgEvent {
    private hitCooldown = false

    onInit() {
        this.setGraphic('crate')
        this.speed = 4

        setInterval(async () => {
            try { await this.moveRoutes([Move.tileRandom(1)]) } catch {}
        }, 1000)
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
            player.showNotification(`Sword hit! (${hits}/3)`, { time: 1500 })
            if (hits >= 3) player.showNotification("Sword training done! Talk to Namontack.", { time: 3000 })
        } else if (q3b === 'active') {
            const hits = (player.getVariable('quest_3b_hits') || 0) + 1
            player.setVariable('quest_3b_hits', hits)
            player.showNotification(`Musket hit! (${hits}/3)`, { time: 1500 })
            if (hits >= 3) player.showNotification("Musket training done! Talk to Namontack.", { time: 3000 })
        } else {
            await player.showText("A fast-moving training target. Catch it!")
        }
    }
}
