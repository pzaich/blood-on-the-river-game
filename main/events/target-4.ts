import { RpgEvent, EventData, RpgPlayer, Move } from '@rpgjs/server'

@EventData({
    name: 'target-4',
    hitbox: { width: 24, height: 16 }
})
export default class Target4Event extends RpgEvent {
    private lastPhase = ''

    onInit() {
        this.setGraphic('crate')
        this.speed = 7

        setInterval(async () => {
            try { await this.moveRoutes([Move.tileRandom(2)]) } catch {}
        }, 800)
    }

    async onAction(player: RpgPlayer) {
        const q3a = player.getVariable('quest_3a')
        const q3b = player.getVariable('quest_3b')
        const phase = q3a === 'active' ? 'sword' : (q3b === 'active' ? 'musket' : '')

        // Reset hit state when phase changes
        if (phase && phase !== this.lastPhase) {
            this.lastPhase = phase
        }

        const hitKey = 'target_4_' + phase
        if (player.getVariable(hitKey)) {
            await player.showText("Already hit this target!")
            return
        }

        if (phase === 'sword') {
            player.setVariable(hitKey, true)
            const hits = (player.getVariable('quest_3a_hits') || 0) + 1
            player.setVariable('quest_3a_hits', hits); if (typeof localStorage !== 'undefined') localStorage.setItem('game-sound', 'hit')
            player.showNotification(`Sword hit! (${hits}/6)`, { time: 1500 })
            if (hits >= 6) player.showNotification("All targets hit! Talk to Namontack.", { time: 3000 })
        } else if (phase === 'musket') {
            player.setVariable(hitKey, true)
            const hits = (player.getVariable('quest_3b_hits') || 0) + 1
            player.setVariable('quest_3b_hits', hits); if (typeof localStorage !== 'undefined') localStorage.setItem('game-sound', 'hit')
            player.showNotification(`Musket shot! (${hits}/6)`, { time: 1500 })
            if (hits >= 6) player.showNotification("All targets shot! Talk to Namontack.", { time: 3000 })
        } else {
            await player.showText("A fast-moving training target!")
        }
    }
}
