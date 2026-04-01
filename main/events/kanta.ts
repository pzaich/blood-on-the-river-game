import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'

@EventData({
    name: 'kanta',
    hitbox: { width: 24, height: 16 }
})
export default class KantaEvent extends RpgEvent {
    onInit() {
        this.setGraphic('namontack-sprite')
        this.setComponentsTop(Components.text('Kanta'))
    }

    async onAction(player: RpgPlayer) {
        const quest = player.getVariable('current_quest')
        if (quest === 4) {
            const q4b = player.getVariable('quest_4b')
            if (q4b === 'active') {
                await player.showText("You must focus, Samuel! Pull the string back to your cheek and release smoothly.", { talkWith: this })
                return
            }
            if (player.getVariable('quest_4d') === 'active') {
                await player.showText("In Pasuckuakohowog, you must be fast! Run to the goal and touch it!", { talkWith: this })
                return
            }
            await player.showText("I am Kanta. Namontack and I will teach you our ways.", { talkWith: this })
            return
        }
        await player.showText("Welcome, friend. I am Kanta of the Powhatan.", { talkWith: this })
    }
}
