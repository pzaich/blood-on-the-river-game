import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'settler',
    hitbox: { width: 32, height: 16 }
})
export default class SettlerEvent extends RpgEvent {
    onInit() { this.setGraphic('female') }

    async onAction(player: RpgPlayer) {
        if (player.getVariable('quest_5c') === 'active') {
            await player.showText("Those natives took our fishing nets! We can't trust them!", { talkWith: this })
            const choice = await player.showChoices("How do you respond?", [
                { text: "They borrowed them to show us better fishing spots.", value: 'peace' },
                { text: "Let me talk to Namontack about this.", value: 'mediate' },
                { text: "You're right, we should fight!", value: 'fight' }
            ])
            if (choice && (choice.value === 'peace' || choice.value === 'mediate')) {
                await player.showText("...I suppose that could be true. You know them better than we do.", { talkWith: this })
                await player.showText("Fine, I'll give them a chance. But only because you vouch for them, Samuel.", { talkWith: this })
                player.setVariable('quest_5c', 'complete')
                player.showNotification("Dispute resolved peacefully! You're a true Peacemaker.", { time: 3000 })
            } else {
                await player.showText("No, Samuel. Violence is not the answer. Reverend Hunt taught us better.", { talkWith: this })
                await player.showText("Think about what Namontack would say. Try again.", { talkWith: this })
            }
            return
        }

        await player.showText("Life in Virginia is hard, but we're building something here.", { talkWith: this })
    }
}
