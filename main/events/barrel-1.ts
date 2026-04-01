import { RpgEvent, EventData, RpgPlayer, Move } from '@rpgjs/server'

@EventData({
    name: 'barrel-1',
    hitbox: {
        width: 32,
        height: 16
    }
})
export default class Barrel1Event extends RpgEvent {
    private moving = false
    private stormInterval: any = null

    onInit() {
        this.setGraphic('hero')
        this.speed = 4
    }

    onChanges(player: RpgPlayer) {
        const stormActive = player.getVariable('quest_1c') === 'active'

        if (stormActive && !this.moving) {
            this.moving = true
            this.startSliding()
        }

        if (!stormActive && this.moving) {
            this.moving = false
            this.stopSliding()
        }
    }

    private startSliding() {
        this.stormInterval = setInterval(async () => {
            if (!this.moving) return
            try {
                await this.moveRoutes([Move.tileRandom(2)])
            } catch {}
        }, 800)
    }

    private stopSliding() {
        if (this.stormInterval) {
            clearInterval(this.stormInterval)
            this.stormInterval = null
        }
    }

    async onPlayerTouch(player: RpgPlayer) {
        if (player.getVariable('quest_1c') !== 'active') return

        const hits = (player.getVariable('storm_hits') || 0) + 1
        player.setVariable('storm_hits', hits)

        if (hits >= 3) {
            // Reset storm — player failed, must talk to Smith again
            player.setVariable('storm_hits', 0)
            player.setVariable('quest_1c', 'active')
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('storm-active', 'false')
            }
            await player.showText("You've been knocked down too many times! Talk to Captain Smith to try again.")
            this.moving = false
            this.stopSliding()
        } else {
            await player.showText(`Ouch! A barrel hit you! (${hits}/3 — don't get hit 3 times!)`)
        }
    }
}
