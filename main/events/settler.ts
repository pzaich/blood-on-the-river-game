import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
@EventData({ name: 'settler', hitbox: { width: 8, height: 8 } })
export default class SettlerEvent extends RpgEvent {
    onInit() { this.setGraphic('hunt'); this.setComponentsTop(Components.text('John Ratcliffe')) }
    async onAction(player: RpgPlayer) {
        if (player.getVariable('quest_5c') == 'active') {
            await player.showText("Those savages stole our fishing nets! We cannot trust them!", { talkWith: this })
            const choice = await player.showChoices("How do you respond?", [
                { text: "They were showing us better fishing spots.", value: 'peace' },
                { text: "Let me talk to Namontack about this.", value: 'mediate' },
                { text: "You're right, we should fight!", value: 'fight' }
            ])
            if (choice && (choice.value === 'peace' || choice.value === 'mediate')) {
                await player.showText("...Hmph. Fine. But I'm watching them.", { talkWith: this })
                player.setVariable('quest_5c', 'complete')
                if (typeof localStorage !== 'undefined') localStorage.setItem('game-sound', 'questComplete')
                player.showNotification("Dispute resolved! You're a true Peacemaker.", { time: 3000 })
            } else {
                await player.showText("No, Samuel. Even I know violence is not the answer here. Think about what Reverend Hunt taught us.", { talkWith: this })
            }
            return
        }
        await player.showText("I should be president, not Wingfield! This colony is poorly managed.", { talkWith: this })
    }
}
