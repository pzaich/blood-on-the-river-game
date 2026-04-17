import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'
@EventData({ name: 'tree-12', hitbox: { width: 8, height: 8 } })
export default class Tree12Event extends RpgEvent {
    private chopped = false
    onInit() { this.setGraphic('tree') }
    async onAction(player: RpgPlayer) {
        if (this.chopped) return
        const q2a = player.getVariable('quest_2a')
        const q2d = player.getVariable('quest_2d')
        const q2f = player.getVariable('quest_2f')
        if (q2a == 'active') {
            this.chopped = true; this.setGraphic('')
            if (typeof localStorage !== 'undefined') localStorage.setItem('game-sound', 'chop')
            const logs = (player.getVariable('quest_2_logs') || 0) + 1
            player.setVariable('quest_2_logs', logs)
            player.showNotification(`Chopped! (${logs}/10 logs)`, { time: 1500 })
            if (logs >= 10) player.showNotification("All logs collected! Talk to the carpenter.", { time: 3000 })
        } else if (q2d == 'active') {
            this.chopped = true; this.setGraphic('')
            if (typeof localStorage !== 'undefined') localStorage.setItem('game-sound', 'chop')
            const logs = (player.getVariable('quest_2d_logs') || 0) + 1
            player.setVariable('quest_2d_logs', logs)
            player.showNotification(`Chopped! (${logs}/8 logs for storehouse)`, { time: 1500 })
        } else if (q2f == 'active') {
            this.chopped = true; this.setGraphic('')
            if (typeof localStorage !== 'undefined') localStorage.setItem('game-sound', 'chop')
            const logs = (player.getVariable('quest_2f_logs') || 0) + 1
            player.setVariable('quest_2f_logs', logs)
            player.showNotification(`Chopped! (${logs} logs for houses)`, { time: 1500 })
        } else {
            await player.showText("Talk to Captain Smith first to start building the fort.")
        }
    }
}
