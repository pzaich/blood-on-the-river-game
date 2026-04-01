import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'

@EventData({
    name: 'chief-powhatan',
    hitbox: { width: 8, height: 8 }
})
export default class ChiefPowhatanEvent extends RpgEvent {
    onInit() {
        this.setGraphic('powhatan')
        this.setComponentsTop(Components.text('Chief Powhatan'))
    }

    async onAction(player: RpgPlayer) {
        if (player.getVariable('quest_4e') === 'active') {
            await player.showText("Young Samuel, you have shown respect and courage.", { talkWith: this })
            await player.showText("We wish to honor you. Will you wear the clothing of our people and take the warrior's hairstyle?", { talkWith: this })
            const choice = await player.showChoices("Accept the ceremony?", [
                { text: "I am honored. Yes!", value: 'yes' },
                { text: "I'm not sure...", value: 'unsure' }
            ])
            if (choice && choice.value === 'unsure') {
                await player.showText("There is no shame in thinking. This is a gift, not an obligation. You may return when ready.", { talkWith: this })
                return
            }
            await player.showText("Then it is done! You now wear the clothing of the Powhatan and carry the warrior's spirit.", { talkWith: this })
            await player.showText("Remember — this is not about becoming someone else. It is about understanding each other.", { talkWith: this })
            player.setVariable('quest_4e', 'complete')
            player.showNotification("Ceremony complete! You received Powhatan Outfit and Warrior Hair.", { time: 3000 })
            return
        }

        if (player.getVariable('quest_4e') === 'complete') {
            await player.showText("You honor us, Samuel. Enjoy the feast with Namontack.", { talkWith: this })
            return
        }

        await player.showText("I am Chief Powhatan. Our peoples can learn much from each other.", { talkWith: this })
    }
}
