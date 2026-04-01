import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'captain-smith-jt',
    hitbox: { width: 32, height: 16 }
})
export default class CaptainSmithJTEvent extends RpgEvent {
    onInit() {
        this.setGraphic('smith')
    }

    async onAction(player: RpgPlayer) {
        const quest = player.getVariable('current_quest')

        if (quest === 2) {
            const q2a = player.getVariable('quest_2a')
            const q2e = player.getVariable('quest_2e')

            if (!q2a) {
                await player.showText("Welcome to Virginia, Samuel! This is where we'll build James Fort.", { talkWith: this })
                await player.showText("Talk to the carpenter — he'll tell you what we need.", { talkWith: this })
                player.setVariable('quest_2a', 'active')
                player.setVariable('quest_2_logs', 0)
                return
            }

            if (q2e === 'complete') {
                await player.showText("James Fort is built! You've done well, Samuel.", { talkWith: this })
                await player.showText("But we need food. Time to learn to hunt. Head east into the wilderness.", { talkWith: this })
                player.setVariable('current_quest', 3)
                return
            }

            await player.showText("Keep working with the carpenter, Samuel. The fort won't build itself!", { talkWith: this })
            return
        }

        if (quest === 3) {
            await player.showText("Head east to the wilderness to hunt, Samuel.", { talkWith: this })
            return
        }

        if (quest && quest >= 4) {
            await player.showText("The fort is strong, Samuel. Keep up the good work.", { talkWith: this })
            return
        }

        await player.showText("We have much work to do here in Virginia.", { talkWith: this })
    }
}
