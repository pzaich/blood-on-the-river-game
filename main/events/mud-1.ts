import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'
@EventData({ name: 'mud-1', hitbox: { width: 8, height: 8 } })
export default class Mud1Event extends RpgEvent {
    private cooldown = false
    onInit() { this.setGraphic('mud') }
    async onAction(player: RpgPlayer) {
        if (this.cooldown) return
        if (player.getVariable('quest_2b') != 'active') {
            await player.showText("A pile of thick mud near the water.")
            return
        }
        this.cooldown = true
        setTimeout(() => { this.cooldown = false }, 2000)
        if (typeof localStorage !== 'undefined') localStorage.setItem('game-sound', 'collect')
        const mud = (player.getVariable('quest_2_mud') || 0) + 1
        player.setVariable('quest_2_mud', mud)
        player.showNotification(`Gathered mud! (${mud}/5)`, { time: 1500 })
        if ((player.getVariable('quest_2_hay') || 0) >= 5 && mud >= 5) {
            player.showNotification("All materials collected! Talk to the carpenter.", { time: 3000 })
        }
    }
}
