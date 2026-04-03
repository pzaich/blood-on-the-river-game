import { RpgEvent, EventData, RpgPlayer, Move } from '@rpgjs/server'

@EventData({
    name: 'archery-1',
    hitbox: { width: 8, height: 8 }
})
export default class Archery1Event extends RpgEvent {
    private hitCooldown = false

    onInit() {
        this.setGraphic('crate')
        this.speed = 3

        // Targets move when archery quest is active
        setInterval(async () => {
            try {
                if (typeof localStorage !== 'undefined' && localStorage.getItem('archery-active') === 'true') {
                    await this.moveRoutes([Move.tileRandom(2)])
                }
            } catch {}
        }, 2300)
    }

    async onAction(player: RpgPlayer) {
        if (player.getVariable('quest_4b') != 'active') {
            await player.showText("An archery target made of woven reeds.")
            return
        }
        if (this.hitCooldown) return
        this.hitCooldown = true
        setTimeout(() => { this.hitCooldown = false }, 1200)

        const hits = (player.getVariable('quest_4b_hits') || 0) + 1
        player.setVariable('quest_4b_hits', hits)
        if (typeof localStorage !== 'undefined') localStorage.setItem('game-sound', 'hit')
        player.showNotification(`Arrow hits! (${hits}/5)`, { time: 1500 })
        if (hits >= 5) {
            player.showNotification("All targets hit! Talk to Namontack.", { time: 3000 })
            if (typeof localStorage !== 'undefined') localStorage.setItem('archery-active', 'false')
        }
    }
}
