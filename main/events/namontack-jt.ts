import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'

@EventData({
    name: 'namontack-jt',
    hitbox: { width: 24, height: 16 }
})
export default class NamontackJTEvent extends RpgEvent {
    onInit() { this.setGraphic('powhatan'); this.setComponentsTop(Components.text('Namontack')) }

    async onAction(player: RpgPlayer) {
        const quest = player.getVariable('current_quest')
        if (quest != 5) return

        const q5a = player.getVariable('quest_5a')

        if (!q5a || q5a === 'active') {
            await player.showText("Samuel! I have come to trade with your people.", { talkWith: this })
            await player.showText("I bring corn, squash, and knowledge of the land.", { talkWith: this })
            const choice = await player.showChoices("Trade English tools for Powhatan goods?", [
                { text: "Yes, let's trade!", value: 'trade' },
                { text: "What do you need?", value: 'ask' }
            ])
            if (choice && choice.value === 'ask') {
                await player.showText("We need iron tools — axes, knives. In return, you will never go hungry.", { talkWith: this })
                await player.showText("This trade will help both our peoples survive.", { talkWith: this })
            }
            await player.showText("The trade is done! Your storehouse is now full of corn and squash.", { talkWith: this })
            await player.showText("This is how it should be — two peoples helping each other.", { talkWith: this })
            player.setVariable('quest_5a', 'complete')
            player.showNotification("Trade complete! Talk to Captain Smith.", { time: 3000 })
            return
        }

        if (player.getVariable('quest_5c') === 'active') {
            await player.showText("Samuel, please help us. The settlers are angry, but we mean no harm.", { talkWith: this })
            await player.showText("Tell them we only want peace and fair trade.", { talkWith: this })
            return
        }

        await player.showText("Thank you for being a bridge between our peoples, Samuel.", { talkWith: this })
    }
}
