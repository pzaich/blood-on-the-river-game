import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'tree-2',
    hitbox: { width: 32, height: 16 }
})
export default class Tree2Event extends RpgEvent {
    private chopped = false

    onInit() {
        this.setGraphic('tree') // placeholder — green square would be better
    }

    async onAction(player: RpgPlayer) {
        if (this.chopped) {
            await player.showText("Just a stump now.")
            return
        }
        const q2a = player.getVariable('quest_2a')
        const q2d = player.getVariable('quest_2d')

        if (q2a === 'active' || q2d === 'active') {
            this.chopped = true
            if (q2a === 'active') {
                const logs = (player.getVariable('quest_2_logs') || 0) + 1
                player.setVariable('quest_2_logs', logs)
                player.showNotification(`Chopped a tree! (${logs}/10 logs)`, { time: 1500 })
                if (logs >= 10) {
                    player.showNotification("All logs collected! Talk to the carpenter.", { time: 3000 })
                }
            } else {
                const logs = (player.getVariable('quest_2d_logs') || 0) + 1
                player.setVariable('quest_2d_logs', logs)
                player.showNotification(`Chopped a tree! (${logs}/8 logs for storehouse)`, { time: 1500 })
            }
        } else {
            await player.showText("Talk to Captain Smith first to start building the fort.")
        }
    }
}
