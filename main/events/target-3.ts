import { RpgEvent, EventData, RpgPlayer, Move } from '@rpgjs/server'

@EventData({
    name: 'target-3',
    hitbox: { width: 24, height: 16 }
})
export default class Target3Event extends RpgEvent {
    private hitCooldown = false

    onInit() {
        this.setGraphic('crate')
        this.speed = 6

        setInterval(async () => {
            try { await this.moveRoutes([Move.tileRandom(2)]) } catch {}
        }, 900)
    }

    async onAction(player: RpgPlayer) {
        if (this.hitCooldown) return
        this.hitCooldown = true
        setTimeout(() => { this.hitCooldown = false }, 1000)

        const q3a = player.getVariable('quest_3a')
        const q3b = player.getVariable('quest_3b')

        if (q3a === 'active') {
            const hits = (player.getVariable('quest_3a_hits') || 0) + 1
            player.setVariable('quest_3a_hits', hits)
            if (typeof localStorage !== 'undefined') localStorage.setItem('game-sound', 'hit')
            player.showNotification(`Sword hit! (${hits}/6)`, { time: 1500 })
            if (hits >= 6) player.showNotification("All targets hit! Talk to Namontack.", { time: 3000 })
        } else if (q3b === 'active') {
            const hits = (player.getVariable('quest_3b_hits') || 0) + 1
            player.setVariable('quest_3b_hits', hits)
            if (typeof localStorage !== 'undefined') localStorage.setItem('game-sound', 'hit')
            player.showNotification(`Musket shot! (${hits}/6)`, { time: 1500 })
            if (hits >= 6) player.showNotification("All targets shot! Talk to Namontack.", { time: 3000 })
        } else {
            await player.showText("A fast-moving training target!")
        }
    }
}
