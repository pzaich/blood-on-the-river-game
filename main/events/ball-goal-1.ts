import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'ball-goal-1',
    hitbox: { width: 8, height: 8 }
})
export default class BallGoal1Event extends RpgEvent {
    private cooldown = false
    onInit() { this.setGraphic('crate') }

    async onAction(player: RpgPlayer) {
        if (player.getVariable('quest_4d') !== 'active') {
            await player.showText("A goal post for Pasuckuakohowog, the Powhatan ball game.")
            return
        }
        if (this.cooldown) return
        this.cooldown = true
        setTimeout(() => { this.cooldown = false }, 3000)

        const goals = (player.getVariable('quest_4d_goals') || 0) + 1
        player.setVariable('quest_4d_goals', goals)
        player.showNotification(`Goal! (${goals}/2)`, { time: 1500 })
        if (goals >= 2) {
            player.showNotification("You won the ball game! Talk to Namontack.", { time: 3000 })
        }
    }
}
