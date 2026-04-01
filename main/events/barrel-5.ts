import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'barrel-5',
    hitbox: { width: 32, height: 16 }
})
export default class Barrel5Event extends RpgEvent {
    private hitCooldown = false
    onInit() { this.setGraphic('barrel'); this.speed = 3 }
    async onAction(player: RpgPlayer) { await player.showText("A heavy barrel.") }
    async onPlayerTouch(player: RpgPlayer) {
        if (player.getVariable('quest_1c') !== 'active') return
        if (this.hitCooldown) return
        this.hitCooldown = true
        setTimeout(() => { this.hitCooldown = false }, 2000)
        const hits = (player.getVariable('storm_hits') || 0) + 1
        player.setVariable('storm_hits', hits)
        if (hits >= 3) {
            player.setVariable('storm_hits', 0)
            if (typeof localStorage !== 'undefined') localStorage.setItem('storm-active', 'false')
            player.showNotification("Knocked down! Talk to Captain Smith to retry.", { time: 3000 })
        } else {
            player.showNotification(`Barrel hit! (${hits}/3)`, { time: 1500 })
        }
    }
}
