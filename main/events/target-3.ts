import { RpgEvent, EventData, RpgPlayer, Move } from '@rpgjs/server'

@EventData({
    name: 'target-3',
    hitbox: { width: 24, height: 16 }
})
export default class Target3Event extends RpgEvent {
    private hit = false

    onInit() {
        this.setGraphic('crate')
        this.speed = 6

        setInterval(async () => {
            if (this.hit) return
            try { await this.moveRoutes([Move.tileRandom(2)]) } catch {}
        }, 900)
    }

    async onAction(player: RpgPlayer) {
        if (this.hit) {
            await player.showText("Already hit this target!")
            return
        }

        const q3a = player.getVariable('quest_3a')
        const q3b = player.getVariable('quest_3b')

        if (q3a === 'active') {
            this.hit = true
            const hits = (player.getVariable('quest_3a_hits') || 0) + 1
            player.setVariable('quest_3a_hits', hits)
            player.showNotification(`Target hit! (${hits}/6)`, { time: 1500 })
            if (hits >= 6) player.showNotification("All targets hit! Talk to Namontack.", { time: 3000 })
        } else if (q3b === 'active') {
            this.hit = true
            const hits = (player.getVariable('quest_3b_hits') || 0) + 1
            player.setVariable('quest_3b_hits', hits)
            player.showNotification(`Target shot! (${hits}/6)`, { time: 1500 })
            if (hits >= 6) player.showNotification("All targets shot! Talk to Namontack.", { time: 3000 })
        } else {
            await player.showText("A fast-moving training target!")
        }
    }
}
