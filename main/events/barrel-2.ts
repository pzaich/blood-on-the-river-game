import { RpgEvent, EventData, RpgPlayer, Move } from '@rpgjs/server'

@EventData({
    name: 'barrel-2',
    hitbox: {
        width: 32,
        height: 16
    }
})
export default class Barrel2Event extends RpgEvent {
    private moving = false
    private stormInterval: any = null
    private hitCooldown = false

    onInit() {
        this.setGraphic('barrel')
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
            try { await this.moveRoutes([Move.tileRandom(2)]) } catch {}
        }, 700)
    }

    private stopSliding() {
        if (this.stormInterval) {
            clearInterval(this.stormInterval)
            this.stormInterval = null
        }
    }

    async onPlayerTouch(player: RpgPlayer) {
        if (player.getVariable('quest_1c') !== 'active') return
        if (this.hitCooldown) return

        this.hitCooldown = true
        setTimeout(() => { this.hitCooldown = false }, 2000)

        const hits = (player.getVariable('storm_hits') || 0) + 1
        player.setVariable('storm_hits', hits)

        if (hits >= 3) {
            player.setVariable('storm_hits', 0)
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('storm-active', 'false')
            }
            this.moving = false
            this.stopSliding()
            player.showText("Knocked down too many times! Talk to Captain Smith to try again.")
        } else {
            player.showText(`Ouch! A barrel hit you! (${hits}/3)`)
        }
    }
}
