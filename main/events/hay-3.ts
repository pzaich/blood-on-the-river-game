import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'
@EventData({ name: 'hay-3', hitbox: { width: 8, height: 8 } })
export default class Hay3Event extends RpgEvent {
    private cooldown = false
    onInit() { this.setGraphic('crate') }
    async onAction(player: RpgPlayer) {
        if (this.cooldown) return
        if (player.getVariable('quest_2b') != 'active') {
            await player.showText("A bundle of dried hay by the riverbank.")
            return
        }
        this.cooldown = true
        setTimeout(() => { this.cooldown = false }, 2000)
        if (typeof localStorage !== 'undefined') localStorage.setItem('game-sound', 'collect')
        const hay = (player.getVariable('quest_2_hay') || 0) + 1
        player.setVariable('quest_2_hay', hay)
        player.showNotification(`Gathered hay! (${hay}/5)`, { time: 1500 })
        if (hay >= 5 && (player.getVariable('quest_2_mud') || 0) >= 5) {
            player.showNotification("All materials collected! Talk to the carpenter.", { time: 3000 })
        }
    }
}
