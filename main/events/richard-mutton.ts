import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'

@EventData({
    name: 'richard-mutton',
    hitbox: {
        width: 32,
        height: 16
    }
})
export default class RichardMuttonEvent extends RpgEvent {
    onInit() {
        this.setGraphic('richard')
        this.setComponentsTop(Components.text('Richard Mutton'))
    }

    async onAction(player: RpgPlayer) {
        const quest1d = player.getVariable('quest_1d')

        if (quest1d === 'active') {
            await player.showText("Hey! You must be the captain's new page. I'm Richard Mutton.", {
                talkWith: this
            })
            await player.showText("It's scary down here during storms. I'm glad someone came to talk.", {
                talkWith: this
            })
            const choice = await player.showChoices("Share your bread ration with Richard?", [
                { text: "Here, take some bread.", value: 'share' },
                { text: "Sorry, I need it.", value: 'keep' }
            ])
            if (choice && choice.value === 'share') {
                await player.showText("Thanks, Samuel! You're a good friend. I'll watch your back in Virginia.", {
                    talkWith: this
                })
                player.setVariable('quest_1d', 'complete')
                player.setVariable('richard_friend', true)
                await player.showText("Quest complete! Richard is now your friend. Go talk to Captain Smith.", {
                    talkWith: this
                })
            } else {
                await player.showText("I understand. Times are tough on this ship.", {
                    talkWith: this
                })
                await player.showText("(You can come back and share bread with Richard later.)", {
                    talkWith: this
                })
            }
            return
        }

        if (quest1d === 'complete') {
            await player.showText("Can't wait to see Virginia, Samuel! We'll be great friends there.", {
                talkWith: this
            })
            return
        }

        // Before quest 1d is active
        await player.showText("*yawn* ... I'm trying to sleep. Come back later.", {
            talkWith: this
        })
    }
}
